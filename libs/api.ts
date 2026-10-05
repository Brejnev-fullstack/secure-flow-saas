type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  errors?: unknown;
};

let isRefreshing = false;

let refreshPromise: Promise<boolean> | null = null;

/**
 * Tente de renouveler la session
 * avec le refresh token présent
 * dans le cookie HTTPOnly.
 */
async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch("/api/authentification/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Évite plusieurs refresh simultanés.
 *
 * Exemple :
 *
 * 5 requêtes retournent 401
 *
 * Au lieu de faire :
 *
 * refresh()
 * refresh()
 * refresh()
 * refresh()
 * refresh()
 *
 * Une seule requête refresh est exécutée.
 */
function handleRefresh(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = refreshAccessToken().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * Requête API centralisée.
 *
 * Fonctionnement :
 *
 * 1. Envoie la requête.
 *
 * 2. Si réponse 200 :
 *    retourne les données.
 *
 * 3. Si réponse 401 :
 *    tente un refresh.
 *
 * 4. Si le refresh fonctionne :
 *    rejoue la requête initiale.
 *
 * 5. Si le refresh échoue :
 *    l'utilisateur est considéré
 *    comme déconnecté.
 */
export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
    ...options,
  };

  let response = await fetch(url, requestOptions);

  /**
   * Première réponse réussie
   */
  if (response.ok) {
    return response.json();
  }

  /**
   * On vérifie si l'erreur est
   * une expiration du token.
   */
  if (response.status === 401) {
    const refreshed = await handleRefresh();

    /**
     * Refresh impossible.
     *
     * La session est définitivement expirée.
     */
    if (!refreshed) {
      let message = "Votre session a expiré. Veuillez vous reconnecter.";

      try {
        const error = (await response.json()) as ApiErrorResponse;

        if (error && typeof error.message === "string") {
          message = error.message;
        }
      } catch {
        // On conserve le message par défaut
      }

      throw new Error(message);
    }

    /**
     * Le refresh a réussi.
     *
     * Les nouveaux cookies ont été
     * définis par le serveur.
     *
     * On rejoue maintenant la requête
     * initiale avec le nouveau access token.
     */
    response = await fetch(url, requestOptions);

    /**
     * La requête rejouée a réussi.
     */
    if (response.ok) {
      return response.json();
    }
  }

  /**
   * Gestion des autres erreurs API.
   */
  let message = "Erreur API";

  try {
    const error = (await response.json()) as ApiErrorResponse;

    if (error && typeof error.message === "string") {
      message = error.message;
    }
  } catch {
    message =
      "Une erreur est survenue lors de la communication avec le serveur.";
  }

  throw new Error(message);
}

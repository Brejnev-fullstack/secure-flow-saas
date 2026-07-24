export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    let message = "Erreur API";

    try {
      const error = await res.json();

      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {
      message =
        "Une erreur est survenue lors de la communication avec le serveur.";
    }

    throw new Error(message);
  }

  return res.json();
}

/*export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur API");
  }
  return res.json();
}*/

"use client";

import { AlertTriangle, Trash2 } from "lucide-react";

export default function DangerZone() {
  return (
    <div
      className="
        rounded-xl
        border
        border-red-200
        bg-red-50
        p-6
        dark:border-red-900
        dark:bg-red-950/30
      "
    >
      {/* Header */}

      <div
        className="
          mb-6
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-red-600
            text-white
          "
        >
          <AlertTriangle size={20} />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-red-700
              dark:text-red-400
            "
          >
            Zone dangereuse
          </h2>

          <p
            className="
              text-sm
              text-red-600/80
              dark:text-red-400/70
            "
          >
            Actions irréversibles concernant votre plateforme.
          </p>
        </div>
      </div>

      <div
        className="
          space-y-4
        "
      >
        {/* Désactivation plateforme */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-red-200
            bg-white
            p-4
            dark:border-red-900
            dark:bg-slate-900
          "
        >
          <div>
            <h3
              className="
                font-medium
              "
            >
              Désactiver la plateforme
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Bloque temporairement tous les accès utilisateurs.
            </p>
          </div>

          <button
            className="
              rounded-lg
              border
              border-red-600
              px-4
              py-2
              text-sm
              text-red-600
              hover:bg-red-600
              hover:text-white
            "
          >
            Désactiver
          </button>
        </div>

        {/* Reset */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-red-200
            bg-white
            p-4
            dark:border-red-900
            dark:bg-slate-900
          "
        >
          <div>
            <h3
              className="
                font-medium
              "
            >
              Réinitialiser les paramètres
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Remettre la configuration par défaut.
            </p>
          </div>

          <button
            className="
              rounded-lg
              border
              border-red-600
              px-4
              py-2
              text-sm
              text-red-600
              hover:bg-red-600
              hover:text-white
            "
          >
            Réinitialiser
          </button>
        </div>

        {/* Suppression organisation */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-red-300
            bg-white
            p-4
            dark:border-red-900
            dark:bg-slate-900
          "
        >
          <div>
            <h3
              className="
                flex
                items-center
                gap-2
                font-medium
              "
            >
              <Trash2 size={18} />
              Supprimer organisation
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Cette action supprimera définitivement toutes les données.
            </p>
          </div>

          <button
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-sm
              text-white
              hover:bg-red-700
            "
          >
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
}

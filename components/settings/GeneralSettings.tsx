"use client";

import { Save } from "lucide-react";

export default function GeneralSettings() {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      {/* Header */}

      <div
        className="
          mb-6
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Informations générales
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Configurez les informations principales de votre plateforme.
        </p>
      </div>

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >
        {/* Nom plateforme */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            Nom de la plateforme
          </label>

          <input
            type="text"
            defaultValue="Secure Flow SaaS"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* Email support */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            Email support
          </label>

          <input
            type="email"
            defaultValue="support@secure-flow.com"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* URL */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            URL de la plateforme
          </label>

          <input
            type="url"
            defaultValue="https://secure-flow.com"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* Organisation */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            Organisation
          </label>

          <input
            type="text"
            defaultValue="Secure Flow"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* Description */}

        <div
          className="
            md:col-span-2
          "
        >
          <label
            className="
              text-sm
              font-medium
            "
          >
            Description
          </label>

          <textarea
            rows={4}
            defaultValue="Plateforme SaaS sécurisée de gestion des utilisateurs, équipes et permissions."
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>
      </div>

      {/* Footer */}

      <div
        className="
          mt-6
          flex
          justify-end
        "
      >
        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-white
            hover:bg-blue-700
          "
        >
          <Save size={18} />
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

"use client";

import { ShieldCheck, Save } from "lucide-react";

export default function SecuritySettings() {
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
        <div
          className="
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
              bg-green-600
              text-white
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Sécurité
            </h2>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Configurez les paramètres de sécurité de votre plateforme.
            </p>
          </div>
        </div>
      </div>

      <div
        className="
          space-y-6
        "
      >
        {/* MFA */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            p-4
            dark:border-slate-800
          "
        >
          <div>
            <h3 className="font-medium">
              Authentification multi-facteurs (MFA)
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Ajouter une couche de sécurité supplémentaire.
            </p>
          </div>

          <button
            className="
              relative
              h-6
              w-11
              rounded-full
              bg-green-600
            "
          >
            <span
              className="
                absolute
                right-1
                top-1
                h-4
                w-4
                rounded-full
                bg-white
              "
            />
          </button>
        </div>

        {/* Access token */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            Expiration Access Token
          </label>

          <select
            defaultValue="15"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          >
            <option value="5">5 minutes</option>

            <option value="15">15 minutes</option>

            <option value="30">30 minutes</option>

            <option value="60">1 heure</option>
          </select>
        </div>

        {/* Refresh token */}

        <div>
          <label
            className="
              text-sm
              font-medium
            "
          >
            Durée Refresh Token
          </label>

          <select
            defaultValue="7"
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          >
            <option value="1">1 jour</option>

            <option value="7">7 jours</option>

            <option value="30">30 jours</option>
          </select>
        </div>

        {/* Password policy */}

        <div
          className="
            rounded-xl
            border
            p-5
            dark:border-slate-800
          "
        >
          <h3
            className="
              mb-4
              font-semibold
            "
          >
            Politique de mot de passe
          </h3>

          <div
            className="
              space-y-3
            "
          >
            <label
              className="
                flex
                items-center
                gap-3
              "
            >
              <input type="checkbox" defaultChecked />

              <span className="text-sm">Minimum 8 caractères</span>
            </label>

            <label
              className="
                flex
                items-center
                gap-3
              "
            >
              <input type="checkbox" defaultChecked />

              <span className="text-sm">Une lettre majuscule obligatoire</span>
            </label>

            <label
              className="
                flex
                items-center
                gap-3
              "
            >
              <input type="checkbox" defaultChecked />

              <span className="text-sm">Un chiffre obligatoire</span>
            </label>
          </div>
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

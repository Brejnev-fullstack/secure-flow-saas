"use client";

import { Bell, Save } from "lucide-react";

export default function NotificationSettings() {
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
            bg-blue-600
            text-white
          "
        >
          <Bell size={20} />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Notifications
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Configurez les alertes envoyées aux administrateurs.
          </p>
        </div>
      </div>

      <div
        className="
          space-y-4
        "
      >
        {/* Nouvelle connexion */}

        <NotificationItem
          title="Nouvelle connexion"
          description="Recevoir une alerte lorsqu'un utilisateur se connecte."
          defaultChecked
        />

        {/* Changement rôle */}

        <NotificationItem
          title="Modification des permissions"
          description="Être averti lorsqu'un rôle ou une permission change."
          defaultChecked
        />

        {/* Suppression */}

        <NotificationItem
          title="Suppression utilisateur"
          description="Recevoir une alerte lorsqu'un compte est supprimé."
          defaultChecked
        />

        {/* Rapport */}

        <NotificationItem
          title="Rapport de sécurité hebdomadaire"
          description="Recevoir un résumé des événements importants."
        />

        {/* Email */}

        <NotificationItem
          title="Notifications email"
          description="Activer l'envoi des notifications par email."
          defaultChecked
        />
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

type NotificationItemProps = {
  title: string;

  description: string;

  defaultChecked?: boolean;
};

function NotificationItem({
  title,
  description,
  defaultChecked,
}: NotificationItemProps) {
  return (
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
        <h3
          className="
            font-medium
          "
        >
          {title}
        </h3>

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          {description}
        </p>
      </div>

      <label
        className="
          relative
          inline-flex
          cursor-pointer
          items-center
        "
      >
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />

        <div
          className="
            h-6
            w-11
            rounded-full
            bg-slate-300
            peer-checked:bg-blue-600
            after:absolute
            after:left-1
            after:top-1
            after:h-4
            after:w-4
            after:rounded-full
            after:bg-white
            after:transition-all
            peer-checked:after:translate-x-5
          "
        />
      </label>
    </div>
  );
}

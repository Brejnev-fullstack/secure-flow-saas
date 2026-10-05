"use client";

import { X, UsersRound, CalendarDays } from "lucide-react";

type Team = {
  id: number;
  name: string;
  description: string;
  members: number;
  status: "ACTIVE" | "INACTIVE";
};

type Props = {
  open: boolean;
  team?: Team;
  onClose: () => void;
};

export default function TeamProfileDrawer({ open, team, onClose }: Props) {
  if (!open || !team) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
      "
    >
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Drawer */}

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-md
          bg-white
          p-6
          shadow-xl
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            pb-4
            dark:border-slate-800
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Détails équipe
            </h2>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Informations générales
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Profil équipe */}

        <div
          className="
            mt-6
            space-y-6
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                text-2xl
                font-bold
                text-white
              "
            >
              {team.name.charAt(0)}
            </div>

            <div>
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                {team.name}
              </h3>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs

                  ${
                    team.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {team.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Description */}

          <div>
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Description
            </p>

            <p
              className="
                mt-1
                font-medium
              "
            >
              {team.description}
            </p>
          </div>

          {/* Membres */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <UsersRound size={20} className="text-blue-600" />

            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Membres
              </p>

              <p className="font-medium">{team.members} utilisateurs</p>
            </div>
          </div>

          {/* Date création */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <CalendarDays size={20} className="text-blue-600" />

            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Création
              </p>

              <p className="font-medium">15/07/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

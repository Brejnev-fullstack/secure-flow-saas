"use client";

import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
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
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-slate-900
              text-white
              dark:bg-slate-700
            "
          >
            <Settings size={24} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Paramètres
            </h1>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Configurez votre plateforme SaaS et ses options générales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

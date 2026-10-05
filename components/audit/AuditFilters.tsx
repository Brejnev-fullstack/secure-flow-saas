"use client";

import { Search } from "lucide-react";

export default function AuditFilters() {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      <div
        className="
          grid
          gap-4
          md:grid-cols-4
        "
      >
        {/* Recherche */}

        <div
          className="
            relative
            md:col-span-2
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-3
              top-3
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Rechercher un utilisateur ou une action..."
            className="
              w-full
              rounded-lg
              border
              py-2
              pl-10
              pr-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* Action */}

        <select
          className="
            rounded-lg
            border
            px-4
            py-2
            dark:bg-slate-800
            dark:border-slate-700
          "
        >
          <option>Toutes les actions</option>

          <option>LOGIN</option>

          <option>USER_CREATE</option>

          <option>USER_UPDATE</option>

          <option>USER_DELETE</option>
        </select>

        {/* Statut */}

        <select
          className="
            rounded-lg
            border
            px-4
            py-2
            dark:bg-slate-800
            dark:border-slate-700
          "
        >
          <option>Tous les statuts</option>

          <option>SUCCESS</option>

          <option>FAILED</option>
        </select>
      </div>
    </div>
  );
}

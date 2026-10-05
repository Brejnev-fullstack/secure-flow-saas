"use client";

import { Search } from "lucide-react";

export default function RoleFilters() {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-4
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="relative max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Rechercher un rôle..."
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
            dark:border-slate-700
            dark:bg-slate-800
          "
        />
      </div>
    </div>
  );
}

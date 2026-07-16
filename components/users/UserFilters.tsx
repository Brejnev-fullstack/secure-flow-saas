import { Search, Filter } from "lucide-react";

export default function UserFilters() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-xl
        border
        bg-white
        p-4
        md:flex-row
        dark:bg-slate-900
        dark:border-slate-800
      "
    >

      <div
        className="
          relative
          flex-1
        "
      >
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
          placeholder="Rechercher un utilisateur..."
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

      {/* Filtre rôle */}

      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          px-4
          py-2
          hover:bg-slate-50
          dark:border-slate-700
          dark:hover:bg-slate-800
        "
      >
        <Filter size={18} />
        Rôle
      </button>

      <button
        className="
          rounded-lg
          border
          px-4
          py-2
          hover:bg-slate-50
          dark:border-slate-700
          dark:hover:bg-slate-800
        "
      >
        Statut
      </button>
    </div>
  );
}

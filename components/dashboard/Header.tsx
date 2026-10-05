import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-6
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      
      <div
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-slate-100
          px-3
          py-2
          dark:bg-slate-800
        "
      >
        <Search size={18} />

        <input
          placeholder="Rechercher..."
          className="
            bg-transparent
            outline-none
            text-sm
          "
        />
      </div>

     
      <div
        className="
        flex
        items-center
        gap-5
      "
      >
        <button>
          <Bell size={20} />
        </button>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-white
            "
          >
            B
          </div>

          <span className="text-sm font-medium">Brejnev</span>
        </div>
      </div>
    </header>
  );
}

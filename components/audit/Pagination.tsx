"use client";

export default function Pagination() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        bg-white
        px-6
        py-4
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        Page 1 sur 10
      </p>

      <div
        className="
          flex
          gap-2
        "
      >
        <button
          className="
            rounded-lg
            border
            px-3
            py-1
            text-sm
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          Précédent
        </button>

        <button
          className="
            rounded-lg
            bg-blue-600
            px-3
            py-1
            text-sm
            text-white
          "
        >
          1
        </button>

        <button
          className="
            rounded-lg
            border
            px-3
            py-1
            text-sm
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          2
        </button>

        <button
          className="
            rounded-lg
            border
            px-3
            py-1
            text-sm
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

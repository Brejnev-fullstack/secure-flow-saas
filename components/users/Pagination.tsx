export default function Pagination() {
  return (
    <div
      className="
flex
justify-between
items-center
rounded-xl
border
bg-white
p-4
dark:bg-slate-900
dark:border-slate-800
"
    >
      <p className="text-sm text-slate-500">1-20 sur 1245 utilisateurs</p>

      <div className="flex gap-2">
        <button className="rounded border px-3 py-1">Précédent</button>

        <button className="rounded border px-3 py-1">1</button>

        <button className="rounded border px-3 py-1">2</button>

        <button className="rounded border px-3 py-1">Suivant</button>
      </div>
    </div>
  );
}

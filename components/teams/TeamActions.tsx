import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TeamActions({ onView, onEdit, onDelete }: Props) {
  return (
    <div
      className="
        flex
        justify-end
        gap-3
      "
    >
      {/* Voir */}

      <button
        onClick={onView}
        className="
          text-slate-500
          transition
          hover:text-blue-600
        "
        title="Voir l'équipe"
      >
        <Eye size={18} />
      </button>

      {/* Modifier */}

      <button
        onClick={onEdit}
        className="
          text-slate-500
          transition
          hover:text-green-600
        "
        title="Modifier l'équipe"
      >
        <Pencil size={18} />
      </button>

      {/* Supprimer */}

      <button
        onClick={onDelete}
        className="
          text-slate-500
          transition
          hover:text-red-600
        "
        title="Supprimer l'équipe"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

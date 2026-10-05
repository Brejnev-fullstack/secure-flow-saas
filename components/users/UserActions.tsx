import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserActions({ onView, onEdit, onDelete }: Props) {
  return (
    <div
      className="
        flex
        justify-end
        gap-3
      "
    >
      <button
        onClick={onView}
        className="
          text-slate-500
          hover:text-blue-600
        "
      >
        <Eye size={18} />
      </button>

      <button
        onClick={onEdit}
        className="
          text-slate-500
          hover:text-green-600
        "
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="
          text-slate-500
          hover:text-red-600
        "
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

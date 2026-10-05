"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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

type FormData = {
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function TeamEditForm({ open, team, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  const [error, setError] = useState("");

  /*useEffect(() => {
    if (team) {
      /*setFormData({
        name: team.name,

        description: team.description,

        status: team.status,
      });
    }
  }, [team]);*/

  if (!open || !team) {
    return null;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Le nom de l'équipe est obligatoire");

      return;
    }

    /*console.log("Modification équipe", {
      id: team.id,
      ...formData,
    });*/

    onClose();
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
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

      {/* Modal */}

      <div
        className="
          relative
          w-full
          max-w-lg
          rounded-xl
          bg-white
          p-6
          shadow-xl
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Modifier équipe
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Mettre à jour les informations.
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

        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
          "
        >
          {/* Nom */}

          <div>
            <label
              className="
                text-sm
                font-medium
              "
            >
              Nom équipe
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
                mt-2
                w-full
                rounded-lg
                border
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
                dark:bg-slate-800
                dark:border-slate-700
              "
            />
          </div>

          {/* Description */}

          <div>
            <label
              className="
                text-sm
                font-medium
              "
            >
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="
                mt-2
                w-full
                rounded-lg
                border
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
                dark:bg-slate-800
                dark:border-slate-700
              "
            />
          </div>

          {/* Statut */}

          <div>
            <label
              className="
                text-sm
                font-medium
              "
            >
              Statut
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                mt-2
                w-full
                rounded-lg
                border
                px-4
                py-2
                dark:bg-slate-800
                dark:border-slate-700
              "
            >
              <option value="ACTIVE">Active</option>

              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {error && (
            <p
              className="
                text-sm
                text-red-600
              "
            >
              {error}
            </p>
          )}

          {/* Boutons */}

          <div
            className="
              flex
              justify-end
              gap-3
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border
                px-4
                py-2
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              className="
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-white
                hover:bg-blue-700
              "
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

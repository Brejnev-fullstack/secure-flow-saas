"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  description: string;
};

export default function CreateTeamForm({ open, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

    console.log("Nouvelle équipe", formData);

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
              Nouvelle équipe
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Créer une nouvelle équipe SaaS.
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
              Nom de équipe
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Development"
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
              placeholder="Description de l'équipe..."
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

          {/* Erreur */}

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

          {/* Actions */}

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
              Créer équipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

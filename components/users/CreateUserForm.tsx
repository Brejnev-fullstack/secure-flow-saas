"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { api } from "@/libs/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  login: string;
  password: string;
  role: "USER" | "MANAGER" | "ADMIN";
};

export default function CreateUserForm({ open, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    email: "",
    login: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) {
    return null;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api("", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setSuccess("Utilisateur créé avec succès");

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        login: "",
        password: "",
        role: "USER",
      });

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de la création",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        dark:bg-slate-900
        dark:border-slate-800
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
            Ajouter un utilisateur
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Créer un nouveau compte utilisateur.
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

      {error && (
        <p
          className="
            mb-4
            rounded-lg
            bg-red-100
            p-3
            text-sm
            text-red-700
          "
        >
          {error}
        </p>
      )}

      {success && (
        <p
          className="
            mb-4
            rounded-lg
            bg-green-100
            p-3
            text-sm
            text-green-700
          "
        >
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >
        <div>
          <label className="text-sm font-medium">Nom</label>

          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            type="text"
            placeholder="Nom"
            required
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

        <div>
          <label className="text-sm font-medium">Prénom</label>

          <input
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            type="text"
            placeholder="Prénom"
            required
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

        <div>
          <label className="text-sm font-medium">Email</label>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="email@example.com"
            required
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

        <div>
          <label className="text-sm font-medium">Login</label>

          <input
            name="login"
            value={formData.login}
            onChange={handleChange}
            type="text"
            placeholder="Identifiant"
            required
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

        <div>
          <label className="text-sm font-medium">Mot de passe</label>

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="********"
            required
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

        <div>
          <label className="text-sm font-medium">Rôle</label>

          <select
            name="role"
            value={formData.role}
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
            <option value="USER">USER</option>

            <option value="MANAGER">MANAGER</option>

            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div
          className="
            md:col-span-2
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
            disabled={loading}
            type="submit"
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading ? "Création..." : "Créer utilisateur"}
          </button>
        </div>
      </form>
    </div>
  );
}

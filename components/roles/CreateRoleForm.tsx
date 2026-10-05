"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { ROLE_PERMISSIONS } from "./role-permissions";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateRoleForm({ open, onClose }: Props) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  if (!open) {
    return null;
  }

  function togglePermission(permission: string) {
    setSelectedPermissions((current) => {
      if (current.includes(permission)) {
        return current.filter((item) => item !== permission);
      }

      return [...current, permission];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name,
      description,
      permissions: selectedPermissions,
    };

    console.log("Création rôle", data);

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
      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
        onClick={onClose}
      />

      <div
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-xl
          bg-white
          p-6
          dark:bg-slate-900
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2 className="text-xl font-bold">Nouveau rôle</h2>

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

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="text-sm font-medium">Nom du rôle</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ADMIN"
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
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du rôle"
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
            />
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Permissions</h3>

            <div className="space-y-5">
              {ROLE_PERMISSIONS.map((section) => (
                <div
                  key={section.module}
                  className="
                    rounded-lg
                    border
                    p-4
                    dark:border-slate-800
                  "
                >
                  <h4 className="mb-3 font-medium">{section.module}</h4>

                  <div className="space-y-2">
                    {section.permissions.map((permission) => (
                      <label
                        key={permission}
                        className="
                          flex
                          items-center
                          gap-3
                          text-sm
                        "
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                        />

                        {permission}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              Créer le rôle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

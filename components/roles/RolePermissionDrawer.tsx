"use client";

import { X, CheckCircle2, Shield } from "lucide-react";
import { ROLE_PERMISSIONS } from "./role-permissions";

type Role = {
  id: number;
  name: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER";
};

type Props = {
  open: boolean;
  role?: Role;
  onClose: () => void;
};

export default function RolePermissionDrawer({ open, role, onClose }: Props) {
  if (!open || !role) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
      "
    >
      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
        onClick={onClose}
      />

      {/* Drawer */}

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-xl
          overflow-y-auto
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            p-6
            dark:border-slate-800
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-indigo-600
                text-white
              "
            >
              <Shield size={22} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                "
              >
                {role.name}
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Permissions attribuées
              </p>
            </div>
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

        {/* Permissions */}

        <div
          className="
            space-y-6
            p-6
          "
        >
          {ROLE_PERMISSIONS.map((section) => (
            <div
              key={section.module}
              className="
                rounded-xl
                border
                p-5
                dark:border-slate-800
              "
            >
              <h3
                className="
                  mb-4
                  text-lg
                  font-semibold
                "
              >
                {section.module}
              </h3>

              <div
                className="
                  space-y-3
                "
              >
                {section.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <CheckCircle2 size={18} className="text-green-600" />

                    <span
                      className="
                        text-sm
                      "
                    >
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

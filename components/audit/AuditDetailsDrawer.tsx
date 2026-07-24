"use client";

import { X, ShieldAlert, Clock, Globe, User } from "lucide-react";

type AuditStatus = "SUCCESS" | "FAILED";

type AuditLog = {
  id: number;
  user: string;
  action: string;
  resource: string;
  ip: string;
  date: string;
  status: AuditStatus;
};

type Props = {
  open: boolean;
  log?: AuditLog;
  onClose: () => void;
};

export default function AuditDetailsDrawer({ open, log, onClose }: Props) {
  if (!open || !log) {
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
                bg-red-600
                text-white
              "
            >
              <ShieldAlert size={22} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                "
              >
                Détail événement
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Audit log #{log.id}
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

        {/* Content */}

        <div
          className="
            space-y-6
            p-6
          "
        >
          {/* Utilisateur */}

          <div
            className="
              rounded-xl
              border
              p-5
              dark:border-slate-800
            "
          >
            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                font-semibold
              "
            >
              <User size={18} />
              Utilisateur
            </div>

            <p className="text-slate-500">{log.user}</p>
          </div>

          {/* Action */}

          <div
            className="
              rounded-xl
              border
              p-5
              dark:border-slate-800
            "
          >
            <h3 className="mb-3 font-semibold">Action</h3>

            <span
              className="
                rounded-lg
                bg-blue-100
                px-3
                py-1
                text-sm
                text-blue-700
              "
            >
              {log.action}
            </span>
          </div>

          {/* Informations */}

          <div
            className="
              rounded-xl
              border
              p-5
              space-y-4
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
              <Globe size={18} />

              <div>
                <p className="text-xs text-slate-500">Adresse IP</p>

                <p>{log.ip}</p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Clock size={18} />

              <div>
                <p className="text-xs text-slate-500">Date</p>

                <p>{log.date}</p>
              </div>
            </div>
          </div>

          {/* Résultat */}

          <div
            className="
              rounded-xl
              border
              p-5
              dark:border-slate-800
            "
          >
            <h3 className="mb-3 font-semibold">Résultat</h3>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium

                ${
                  log.status === "SUCCESS"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {log.status}
            </span>
          </div>

          {/* Metadata future API */}

          <div
            className="
              rounded-xl
              border
              p-5
              dark:border-slate-800
            "
          >
            <h3 className="mb-3 font-semibold">Metadata</h3>

            <pre
              className="
                overflow-x-auto
                rounded-lg
                bg-slate-100
                p-4
                text-xs
                dark:bg-slate-800
              "
            >
              {`{
  "browser": "Chrome",
  "os": "Windows",
  "changes": {}
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

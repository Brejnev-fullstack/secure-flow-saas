"use client";

import { useState } from "react";
import { Eye, ShieldCheck } from "lucide-react";

import AuditStatusBadge from "./AuditStatusBadge";
import AuditDetailsDrawer from "./AuditDetailsDrawer";

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

const auditLogs: AuditLog[] = [
  {
    id: 1,
    user: "Brejnev Ngondi",
    action: "USER_CREATE",
    resource: "User #15",
    ip: "192.168.1.10",
    date: "17/07/2026 14:20",
    status: "SUCCESS",
  },

  {
    id: 2,
    user: "Marie Martin",
    action: "ROLE_UPDATE",
    resource: "ADMIN",
    ip: "192.168.1.20",
    date: "17/07/2026 14:10",
    status: "SUCCESS",
  },

  {
    id: 3,
    user: "Jean Dupont",
    action: "LOGIN_FAILED",
    resource: "Authentication",
    ip: "192.168.1.30",
    date: "17/07/2026 13:55",
    status: "FAILED",
  },
];

export default function AuditTable() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-xl
          border
          bg-white
          dark:bg-slate-900
          dark:border-slate-800
        "
      >
        <div
          className="
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
              text-sm
            "
          >
            <thead
              className="
                border-b
                bg-slate-50
                dark:bg-slate-800
                dark:border-slate-700
              "
            >
              <tr>
                <th className="px-6 py-4 text-left">Utilisateur</th>

                <th className="px-6 py-4 text-left">Action</th>

                <th className="px-6 py-4 text-left">Ressource</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Statut</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="
                    border-b
                    last:border-none
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >
                  {/* User */}

                  <td className="px-6 py-4">
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
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-indigo-600
                          text-white
                        "
                      >
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <div className="font-medium">{log.user}</div>

                        <div
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          IP : {log.ip}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Action */}

                  <td className="px-6 py-4">
                    <span
                      className="
                        rounded-lg
                        bg-blue-100
                        px-3
                        py-1
                        text-xs
                        text-blue-700
                      "
                    >
                      {log.action}
                    </span>
                  </td>

                  {/* Ressource */}

                  <td className="px-6 py-4">{log.resource}</td>

                  {/* Date */}

                  <td className="px-6 py-4 text-slate-500">{log.date}</td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <AuditStatusBadge status={log.status} />
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <div
                      className="
                        flex
                        justify-end
                      "
                    >
                      <button
                        onClick={() => {
                          setSelectedLog(log);

                          setDrawerOpen(true);
                        }}
                        className="
                          text-slate-500
                          hover:text-blue-600
                        "
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AuditDetailsDrawer
        open={drawerOpen}
        log={selectedLog ?? undefined}
        onClose={() => {
          setDrawerOpen(false);

          setSelectedLog(null);
        }}
      />
    </>
  );
}

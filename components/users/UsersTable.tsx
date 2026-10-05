"use client";

import { useState } from "react";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";
import UserProfileDrawer from "./UserProfileDrawer";
import UserEditForm from "./UserEditForm";
import DeleteUserModal from "./DeleteUserModal";

type UserRole = "USER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  status: boolean;
};

const users: User[] = [
  {
    id: 1,
    nom: "Ngondi",
    prenom: "Brejnev",
    email: "brejnev@test.com",
    role: "ADMIN",
    status: true,
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Marie",
    email: "marie@test.com",
    role: "USER",
    status: true,
  },
  {
    id: 3,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean@test.com",
    role: "MANAGER",
    status: false,
  },
];

export default function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
          <table className="w-full text-sm">
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

                <th className="px-6 py-4 text-left">Email</th>

                <th className="px-6 py-4 text-left">Rôle</th>

                <th className="px-6 py-4 text-left">Statut</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    border-b
                    last:border-none
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >
                  {/* Utilisateur */}

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
                          bg-blue-600
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {user.prenom.charAt(0)}
                      </div>

                      <div>
                        <div className="font-medium">
                          {user.prenom} {user.nom}
                        </div>

                        <div
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          ID #{user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td
                    className="
                      px-6
                      py-4
                      text-slate-500
                    "
                  >
                    {user.email}
                  </td>

                  {/* Role */}

                  <td className="px-6 py-4">
                    <UserRoleBadge role={user.role} />
                  </td>

                  {/* Statut */}

                  <td className="px-6 py-4">
                    <UserStatusBadge active={user.status} />
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <UserActions
                      onView={() => {
                        setSelectedUser(user);
                        setDrawerOpen(true);
                      }}
                      onEdit={() => {
                        setSelectedUser(user);
                        setEditOpen(true);
                      }}
                      onDelete={() => {
                        setSelectedUser(user);
                        setDeleteOpen(true);
                      }}
                    />
                    {/*<UserActions
                      onView={() => {
                        setSelectedUser(user);
                        setDrawerOpen(true);
                      }}
                      onEdit={() => {
                        console.log("Modifier utilisateur", user);
                      }}
                      onDelete={() => {
                        console.log("Supprimer utilisateur", user);
                      }}
                    />*/}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Profil */}

      <UserProfileDrawer
        open={drawerOpen}
        user={selectedUser ?? undefined}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Modification utilisateur */}

      <UserEditForm
        open={editOpen}
        user={selectedUser}
        onClose={() => {
          setEditOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Suppression utilisateur */}

      <DeleteUserModal
        open={deleteOpen}
        user={selectedUser}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}

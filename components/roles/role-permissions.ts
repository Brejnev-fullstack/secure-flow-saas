export const ROLE_PERMISSIONS = [
  {
    module: "Utilisateurs",
    permissions: [
      "users.read",
      "users.create",
      "users.update",
      "users.delete",
    ],
  },

  {
    module: "Équipes",
    permissions: [
      "teams.read",
      "teams.create",
      "teams.update",
      "teams.delete",
    ],
  },

  {
    module: "Rôles",
    permissions: [
      "roles.read",
      "roles.create",
      "roles.update",
      "roles.delete",
    ],
  },

  {
    module: "Audit",
    permissions: [
      "audit.read",
    ],
  },

  {
    module: "Paramètres",
    permissions: [
      "settings.read",
      "settings.update",
    ],
  },
];
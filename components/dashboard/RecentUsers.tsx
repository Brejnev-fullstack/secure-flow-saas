const users = [
  {
    name: "Jean Dupont",
    role: "ADMIN",
  },
  {
    name: "Marie Martin",
    role: "USER",
  },
  {
    name: "Paul Bernard",
    role: "MANAGER",
  },
];

export default function RecentUsers() {
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
      <h2
        className="
        mb-4
        text-xl
        font-semibold
      "
      >
        Derniers utilisateurs
      </h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.name}
            className="
              flex
              items-center
              justify-between
              border-b
              pb-3
              last:border-none
            "
          >
            <span>{user.name}</span>

            <span
              className="
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                text-blue-700
              "
            >
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

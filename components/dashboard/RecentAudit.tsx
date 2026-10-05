const logs = ["USER_LOGIN", "USER_REGISTERED", "ROLE_CHANGED"];

export default function RecentAudit() {
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
        Audit récent
      </h2>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log}
            className="
              rounded-lg
              bg-slate-100
              px-4
              py-3
              text-sm
              dark:bg-slate-800
            "
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

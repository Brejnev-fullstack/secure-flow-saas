type Props = {
  role: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER";
};

export default function RoleBadge({ role }: Props) {
  const styles = {
    SUPER_ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    ADMIN:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

    MANAGER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

    USER: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[role]}
      `}
    >
      {role}
    </span>
  );
}

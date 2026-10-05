type Props = {
  role: string;
};

const roles = {
  USER: "bg-slate-100 text-slate-700",
  MANAGER: "bg-blue-100 text-blue-700",
  ADMIN: "bg-purple-100 text-purple-700",
  SUPER_ADMIN: "bg-red-100 text-red-700",
};

export default function UserRoleBadge({ role }: Props) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${roles[role as keyof typeof roles]}
      `}
    >
      {role}
    </span>
  );
}

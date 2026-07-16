import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        shadow-sm
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <div>
          <p
            className="
            text-sm
            text-slate-500
          "
          >
            {title}
          </p>

          <h2
            className="
            mt-2
            text-3xl
            font-bold
          "
          >
            {value}
          </h2>

          <p
            className="
            mt-2
            text-xs
            text-slate-500
          "
          >
            {description}
          </p>
        </div>

        <div
          className="
            rounded-lg
            bg-blue-100
            p-3
            text-blue-600
            dark:bg-blue-950
          "
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

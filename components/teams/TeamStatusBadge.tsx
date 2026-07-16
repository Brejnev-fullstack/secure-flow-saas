type Props = {
  status: "ACTIVE" | "INACTIVE";
};

export default function TeamStatusBadge({ status }: Props) {
  const isActive = status === "ACTIVE";

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium

        ${
          isActive
            ? `
              bg-green-100
              text-green-700
              dark:bg-green-900/30
              dark:text-green-400
            `
            : `
              bg-red-100
              text-red-700
              dark:bg-red-900/30
              dark:text-red-400
            `
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

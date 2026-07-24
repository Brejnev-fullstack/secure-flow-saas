type Props = {
  status: "SUCCESS" | "FAILED";
};

export default function AuditStatusBadge({ status }: Props) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium

        ${
          status === "SUCCESS"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }

      `}
    >
      {status}
    </span>
  );
}

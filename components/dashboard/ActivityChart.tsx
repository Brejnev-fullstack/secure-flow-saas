"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "Lun",
    users: 120,
  },
  {
    day: "Mar",
    users: 180,
  },
  {
    day: "Mer",
    users: 240,
  },
  {
    day: "Jeu",
    users: 210,
  },
  {
    day: "Ven",
    users: 320,
  },
  {
    day: "Sam",
    users: 280,
  },
  {
    day: "Dim",
    users: 400,
  },
];

export default function ActivityChart() {
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
        mb-6
        text-xl
        font-semibold
      "
      >
        Activité utilisateurs
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

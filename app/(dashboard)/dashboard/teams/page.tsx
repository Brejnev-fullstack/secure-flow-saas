"use client";

import { useState } from "react";

import TeamsHeader from "@/components/teams/TeamsHeader";
import TeamFilters from "@/components/teams/TeamFilters";
import TeamsTable from "@/components/teams/TeamsTable";
import CreateTeamForm from "@/components/teams/CreateTeamForm";

export default function TeamsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div
      className="
        space-y-8
      "
    >
      <TeamsHeader
        onCreate={() => {
          setCreateOpen(true);
        }}
      />

      <TeamFilters />

      <TeamsTable />

      <CreateTeamForm
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";

import RolesHeader from "@/components/roles/RolesHeader";
import RoleFilters from "@/components/roles/RoleFilters";
import RolesTable from "@/components/roles/RolesTable";
import CreateRoleForm from "@/components/roles/CreateRoleForm";

export default function RolesPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div
      className="
        space-y-8
      "
    >
      <RolesHeader
        onCreate={() => {
          setCreateOpen(true);
        }}
      />

      <RoleFilters />

      <RolesTable />

      <CreateRoleForm
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      />
    </div>
  );
}

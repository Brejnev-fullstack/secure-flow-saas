"use client";

import { useState } from "react";

import UsersHeader from "@/components/users/UsersHeader";
import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";
import Pagination from "@/components/users/Pagination";
import CreateUserForm from "@/components/users/CreateUserForm";

export default function UsersPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div
      className="
        space-y-8
      "
    >
      <UsersHeader
        onCreate={() => {
          setCreateOpen(true);
        }}
      />
      <CreateUserForm
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      />

      <UserFilters />
      <UsersTable />
      <Pagination />
    </div>
  );
}

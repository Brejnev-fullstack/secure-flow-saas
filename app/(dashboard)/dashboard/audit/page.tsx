"use client";

import AuditHeader from "@/components/audit/AuditHeader";
import AuditTable from "@/components/audit/AuditTable";
import AuditFilters from "@/components/audit/AuditFilters";
import Pagination from "@/components/audit/Pagination";

export default function AuditPage() {
  return (
    <div
      className="
        space-y-8
      "
    >
      <AuditHeader />
      <AuditFilters />
      <AuditTable />
      <Pagination />
    </div>
  );
}

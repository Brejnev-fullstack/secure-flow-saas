import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <aside
        className="
          fixed
          left-0
          top-0
          h-screen
          w-64
          border-r
          bg-white
          dark:bg-slate-900
          dark:border-slate-800
        "
      >
        <Sidebar />
      </aside>
      <div
        className="
          ml-64
          h-screen
          flex
          flex-col
        "
      >
        <header
          className="
            fixed
            top-0
            right-0
            left-64
            z-50
            h-16
            border-b
            bg-white/80
            backdrop-blur
            dark:bg-slate-900/80
            dark:border-slate-800
          "
        >
          <Header />
        </header>
        <main
          className="
            mt-16
            h-full
            overflow-y-auto
            p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}

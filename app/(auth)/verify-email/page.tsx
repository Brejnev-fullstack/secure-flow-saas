import VerifyEmail from "@/components/auth/VerifyEmail";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <VerifyEmail />
        </div>
      </div>
    </main>
  );
}
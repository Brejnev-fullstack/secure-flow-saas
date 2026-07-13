"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/libs/api";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [message, setMessage] = useState("Vérification...");

  useEffect(() => {
    async function verify() {
      try {
        await api("/api/authentification/verify-email", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        setMessage("Email vérifié ");
      } catch {
        setMessage("Token invalide");
      }
    }

    if (token) verify();
  }, [token]);

  return <h1>{message}</h1>;
}

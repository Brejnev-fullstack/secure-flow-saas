import { NextResponse } from "next/server";
import { AppError } from "./errors";

export function handleError(error: unknown) {
  console.error("ERROR:", error); 
  if (typeof error === "object" && error !== null && "statusCode" in error) {

    const appError = error as AppError;
    return NextResponse.json(
      {
        message: appError.message,
      },
      {
        status: appError.statusCode,
      },
    );
  }
  console.error(error);
  return NextResponse.json(
    {
      message: "Erreur interne du serveur",
    },
    {
      status: 500,
    },
  );
}

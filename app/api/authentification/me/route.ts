import { NextRequest } from "next/server";

import { getCurrentUser } from "@/modules/authentification/current-user";
import { toUserResponse } from "@/modules/authentification/auth.mapper";
import { handleError } from "@/utils/handle-error";
import { successResponse } from "@/utils/api-response";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    return successResponse(
      {
        user: toUserResponse(user),
      },
      "Utilisateur authentifié",
    );
  } catch (error) {
    return handleError(error);
  }
}

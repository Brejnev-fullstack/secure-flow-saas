import prisma from "@/libs/prisma";

export function create(data: {
  tokenHash: string;
  userId: number;
  expiresAt: Date;
}) {
  return prisma.refreshToken.create({
    data,
  });
}
export function findByHash(tokenHash: string) {
  return prisma.refreshToken.findUnique({
    where: {
      tokenHash,
    },

    include: {
      user: true,
    },
  });
}
export function revoke(id: number) {
  return prisma.refreshToken.update({
    where: {
      id,
    },

    data: {
      revokedAt: new Date(),
    },
  });
}
export function revokeAllByUser(userId: number) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}
export function deleteExpired() {
  return prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

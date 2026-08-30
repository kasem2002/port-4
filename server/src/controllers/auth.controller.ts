import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { signAdminToken } from "../utils/jwt";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await prisma.admin.findUnique({ where: { email } });
  // Compare against a dummy hash when the account is missing so the response
  // time doesn't reveal whether an email exists.
  const hash = admin?.password ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin";
  const valid = await bcrypt.compare(password, hash);

  if (!admin || !valid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signAdminToken({ sub: admin.id, email: admin.email, role: admin.role });
  res.json({
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) throw ApiError.unauthorized();
  const admin = await prisma.admin.findUnique({ where: { id: req.admin.sub } });
  if (!admin) throw ApiError.unauthorized();
  res.json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) throw ApiError.unauthorized();
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };

  const admin = await prisma.admin.findUnique({ where: { id: req.admin.sub } });
  if (!admin) throw ApiError.unauthorized();

  const valid = await bcrypt.compare(currentPassword, admin.password);
  if (!valid) throw ApiError.badRequest("Current password is incorrect");

  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: await bcrypt.hash(newPassword, 10) },
  });

  res.status(204).send();
});

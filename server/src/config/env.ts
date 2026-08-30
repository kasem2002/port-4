import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const isProduction = process.env.NODE_ENV === "production";

const jwtSecret = required("JWT_SECRET", isProduction ? undefined : "dev-only-insecure-secret-change-me");

export const env = {
  port: Number(process.env.PORT ?? 4000),
  isProduction,
  databaseUrl: required("DATABASE_URL", "file:./dev.db"),

  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",

  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",

  seedAdminEmail: process.env.SEED_ADMIN_EMAIL ?? "admin@port-4.dev",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD ?? "change-me-immediately",
  seedAdminName: process.env.SEED_ADMIN_NAME ?? "PORT-4 Admin",

  maxUploadBytes: Number(process.env.MAX_UPLOAD_MB ?? 16) * 1024 * 1024,
};

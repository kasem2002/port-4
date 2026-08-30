import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./prismaClient";

const server = app.listen(env.port, () => {
  console.log(`PORT-4 API listening on http://localhost:${env.port}`);
});

/** Close the HTTP server and the database pool before the process exits. */
async function shutdown(signal: string) {
  console.log(`\n${signal} received — shutting down.`);
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

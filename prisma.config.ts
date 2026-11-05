// Configuração do Prisma 7 (substitui a URL que antes ficava no schema.prisma).
// Carrega o .env para que os comandos `prisma ...` enxerguem DATABASE_URL.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});

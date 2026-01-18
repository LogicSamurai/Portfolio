import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://portfolio_user:portfolio_password@127.0.0.1:5433/portfolio?schema=public",
  },
});

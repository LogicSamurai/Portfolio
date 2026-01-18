# Prisma 7 Migration Notes

## Issues Fixed

### 1. PrismaClient Initialization
**Error**: `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`

**Fix**: Prisma 7 requires an `adapter` option in the constructor. For direct database connections (not using Accelerate), set it to `undefined`:

```typescript
new PrismaClient({
  adapter: undefined,
})
```

### 2. Database URL Configuration
**Change**: Prisma 7 moved database URL from `schema.prisma` to `prisma.config.ts`

**Before** (schema.prisma):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**After** (schema.prisma):
```prisma
datasource db {
  provider = "postgresql"
}
```

The URL is now in `prisma.config.ts`:
```typescript
export default defineConfig({
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

## Known Warnings

### Middleware Deprecation
Next.js 16 shows: `The "middleware" file convention is deprecated. Please use "proxy" instead.`

This is a Next.js 16 change. The middleware still works but will need to be migrated to the new proxy convention in the future. For now, it's safe to ignore this warning.

## Setup Checklist

- [x] Remove `url` from schema.prisma
- [x] Add `adapter: undefined` to PrismaClient constructor
- [x] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev --name init` (when database is ready)
- [ ] Run `npm run create-admin` (after migrations)

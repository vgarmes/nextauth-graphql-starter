`yarn add next-auth @prisma/client @next-auth/prisma-adapter`
`yarn add prisma --dev`

`createdb [DATABASE_NAME]`

`npx prisma init`

Configure your NextAuth.js to use the Prisma Adapter(`pages/api/auth/[...nextauth].ts`)

Create Prisma schema (prisma/schema.prisma)

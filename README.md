# AttaPoll Survey Application

A survey creation and management application built with Next.js, NextAuth.js, and Prisma.

## Features

- User Authentication
- Survey Creation
- Multiple Question Types (Multiple Choice, Text, Rating)
- Responsive Design
- PostgreSQL Database

## Tech Stack

- Next.js 15
- TypeScript
- NextAuth.js for authentication
- Prisma as ORM
- Tailwind CSS for styling
- PostgreSQL for database

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/emmanuel12492/attapol-survey.git
cd attapol-survey
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/attapoll"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

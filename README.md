<h1 align="center">HUKUM</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Website](https://img.shields.io/website?url=https://hukum-rose.vercel.app)](https://hukum-rose.vercel.app)

## Important

> **Warning**: All contributions must be made through pull requests from your forked repository. Direct changes to the main repository will not be accepted.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## Contributing

1. Fork the repository
2. Clone your forked repository
    ```bash
    git clone https://github.com/YOUR_USERNAME/hukum.git
    cd hukum
    ```
3. Install dependencies
    ```bash
    pnpm install
    ```
4. Set up environment variables (see Environment Variables section)
5. Create a new branch
    ```bash
    git checkout -b branch_name
    ```
6. Start the development server
    ```bash
    pnpm dev
    ```
7. Make your changes and test them at [https://localhost:3000](https://localhost:3000)
8. Commit your changes
    ```bash
    git add .
    git commit -m "feat: add your feature description"
    ```
9. Push to your fork
    ```bash
    git push origin branch_name
    ```
10. Create a Pull Request from your fork to our main repository
11. Don't merge without requesting for code review.

## Environment Variables

> **Warning**: Never commit your `.env` files or share them publicly. They may contain sensitive information.

Create a local environment file in the root directory:
```bash
touch .env.local
```
Paste the following in the file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
UPLOADTHING_TOKEN=
```

Message me to get the keys

Keep your environment variables secure and never share them in public repositories or discussions.


## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
To learn more about the libraries we use:

- [shadcn Documentation](https://ui.shadcn.com/docs) - Learn about our UI component library

- [Clerk Documentation](https://clerk.com/docs) - Our authentication provider

- [UploadThing Documentation](https://docs.uploadthing.com/) - File upload solution

## Deploy on Vercel

Once the commits are merged to the main repository, they will be deployed on vercel at [hukum-rose.vercel.app](https://hukum-rose.vercel.app) automatically.
# PlayPals Documentation

## Introduction

PlayPals is a football prediction app built using Next.js. It allows users to predict match outcomes, compete with friends, and track their performance. The app uses a range of technologies including Shadcn UI for styling, Prisma for database ORM, Azure SQL for database hosting, and NextAuth for authentication.

## Tech Stack

- Next.js

- Shadcn UI

- Prisma

- Azure SQL

- TailwindCSS

- NextAuth

- Nodemailer

- React-email

- react-hook-form

- zod

- bcrypt

- lucide-react

- prettier

- eslint

## Environment Variables

Ensure you have an `.env.local` file with the variables mentioned in `.env` and don't forget to add the `env.local` to your `.gitignore` file.

## Getting Started

### Installation

- Clone the repository:

```shell
git clone <https://github.com/your-repo-url.git>
```

- Install dependencies:

```bash
yarn
```

### Starting the App Server

Run the app in development server:

```bash
yarn dev
```

Visit `http://localhost:3000` to view the app.

### Linting

Lint the code using eslint:

```bash
yarn lint
```

Fix linting issues automatically:

```bash
yarn lint:fix
```

### Code Formatting

Format the code using prettier:

```bash
yarn format
```

Fix formatting issues automatically:

```bash
yarn format:fix
```

### Contributing

1. Fork the repository.

2. Create a new branch for your feature: `git checkout -b feature-name`.

3. Make your changes and commit them: `git commit -am 'Add new feature'`.

4. Push to the branch: `git push origin feature-name`.

5. Submit a pull request.

### Conclusion

PlayPals is a modern football prediction app that leverages a variety of technologies to deliver a seamless user experience. By following this documentation, you can easily set up and contribute to the app.

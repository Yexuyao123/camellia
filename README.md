# Camellia

Camellia is a modular and extensible project built on Bun, designed to facilitate code reusability and collaborative development. This project contains multiple applications and a shared library.

## Project Structure

```text
camellia/
├── apps/
│   ├── backend/               # Backend
│   │   └── package.json
│   ├── plan/
│   │   └── package.json       # Application 1
│   └── web/
│       └── package.json       # Application 2
├── packages/
│   ├── shared/         # Shared library
│   │   ├── index.ts
│   │   └── package.json
│   ├── WIP
└── package.json        # Root configuration
```

## Tech Stack

- **[Bun](https://bun.sh)**: A high-performance JavaScript runtime.
- **TypeScript**: A typed superset of JavaScript that helps catch errors early and improves code quality.
- **React**: A library for building user interfaces with reusable components, ideal for single-page applications.
- **PostgreSQL**: An open-source relational database system for storing structured data.
- **Supabase**: An open-source alternative to Firebase that provides a backend-as-a-service, including a `PostgreSQL` database and real-time capabilities.
- **ElysiaJS**: A lightweight web framework for building APIs with a focus on simplicity and performance.
- **Prisma**: An ORM (Object-Relational Mapping) tool that simplifies database interactions and helps manage data models effectively.
- **ESLint**: A tool for identifying and fixing problematic patterns in JavaScript code, ensuring code quality.
- **Prettier**: An opinionated code formatter that maintains consistent style across the codebase.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation

Make sure you have [Bun](https://bun.sh/docs/installation) installed. Then run the following command in the root directory to install all dependencies:

```bash
### for mac next line
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
bun install
```

## Running the Application

In the `plan` directory, you can start the development server with the following command:
```bash
bun run dev --filter=@camellia/plan
# or
bun dev:plan
```

## Running all Application

```bash
bun dev
```

## Backend been changed

```bath
bun emit-types
```

## Using the Shared Library

In your application, you can import the shared library as follows:


```typescript
import { greet } from '@camellia/shared';
console.log(greet('World')); // Output: Hello, World!
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create your feature branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Create a new Pull Request

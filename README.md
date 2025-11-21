# Maglo Dashboard

Finance dashboard built with React, TypeScript, Vite, TanStack Router, and Tailwind.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

The app relies on a single Vite env value:

| Name                | Description                    | Example                     |
| ------------------- | ------------------------------ | --------------------------- |
| `VITE_API_BASE_URL` | Backend REST API base endpoint | `https://case.nodelabs.dev` |

Create a `.env` file at the project root:

```bash
cp .env.example .env
# then edit VITE_API_BASE_URL as needed
```

## Available Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and bundle for production
- `npm run preview` – preview the production build

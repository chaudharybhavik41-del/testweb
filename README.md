# Mechanical Manufacturing Toolkit

Mechanical Manufacturing Toolkit is a Next.js (App Router) workspace for public tooling, manufacturing knowledge, and premium BOM workflows.

## Local development

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   If you do not have pnpm, use npm instead:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Build for production:

   ```bash
   pnpm build
   ```

## Project structure

- `src/app`: App Router routes (public pages + protected premium `/app` area).
- `src/components`: Shared UI components.
- `src/lib`: Shared utility modules.
- `public`: Static assets.

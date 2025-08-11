# Stencil Storybook Vite Starter

This is a starter project for building a standalone Web Component using Stencil and Storybook for Web-Components with Vite.

This project utilizes [Google Wireit](https://github.com/google/wireit) for efficient build management and dev server
operation. Wireit enables the definition of dependencies among npm scripts, allowing them to run either in parallel or
sequentially. This is particularly beneficial when using Stencil with Storybook, as the Storybook scripts rely on the
prior execution of the Stencil scripts. Please note that you can also adjust the package.json scripts to not use Wireit.
However, you would then need to ensure that all dependencies for each script are fulfilled before execution.

## Requirements

- pnpm 10.x

## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone git@github.com:rschaufler/stencil-storybook-vite.git
cd stencil-storybook-vite
```

and run:

```bash
pnpm install
```

To start developing with Stencil and Storybook:

```bash
pnpm start
```

To run a build of Stencil and Storybook run:

```bash
pnpm build
```

## TypeScript Configuration

This project includes custom type declarations in the `types/` directory to resolve compatibility issues between Stencil and modern Vite versions.

### `types/rollup-parseAst.d.ts`

This file provides type declarations for the `rollup/parseAst` module that Vite's type definitions require but TypeScript cannot resolve due to module resolution limitations with subpath imports.

**Why this is needed:**

- Vite 5+ uses Rollup's `parseAst` functionality via subpath imports (`rollup/parseAst`)
- TypeScript's module resolution (even with `bundler`/`nodenext`) cannot resolve these subpath imports in some build contexts
- Without this declaration, builds fail with: `Cannot find module 'rollup/parseAst'`

**What it does:**

- Provides minimal type definitions for `parseAst` and `parseAstAsync` functions
- Enables successful builds while maintaining full TypeScript type checking
- Avoids the need for `skipLibCheck: true` which would disable type checking entirely

This is a clean, targeted solution that only addresses the specific missing module declaration without compromising the project's type safety.

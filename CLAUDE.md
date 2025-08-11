# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Stencil + Storybook + Vite starter project for building standalone Web Components. It uses Google Wireit for efficient build management with dependency orchestration between npm scripts.

## Essential Commands

### Development

```bash
pnpm start                    # Start development server with Stencil watch + Storybook
pnpm stencil:start            # Stencil only dev server
pnpm storybook:start          # Storybook only dev server
```

### Building

```bash
pnpm build                    # Build both Stencil and Storybook
pnpm stencil:build            # Build Stencil components only
pnpm storybook:build          # Build Storybook static site
```

### Testing

```bash
pnpm test                     # Run all tests (unit + e2e)
pnpm stencil:test             # Same as above
pnpm stencil:test:watch       # Run tests in watch mode
```

### Code Quality

```bash
pnpm lint                     # Run ESLint
pnpm lint:fix                 # Fix ESLint issues automatically
pnpm prettier                 # Check Prettier formatting
pnpm prettier:fix             # Fix Prettier formatting
```

### Component Generation

```bash
pnpm stencil:generate         # Generate new Stencil component scaffold
```

## Architecture & Structure

### Wireit Build Dependencies

- **Critical**: Storybook depends on Stencil build outputs
- All `storybook:*` scripts depend on `stencil:build`
- The `start` script runs Stencil in watch mode + Storybook dev server
- Build dependencies are managed by Wireit - don't run Storybook without building Stencil first

### Component Architecture

- **Components**: `src/components/[component-name]/`
  - `*.tsx` - Component implementation using Stencil decorators
  - `*.css` - Component styles
  - `*.stories.tsx` - Storybook stories using Lit templates
  - `*.spec.ts` - Unit tests
  - `*.e2e.ts` - E2E tests
  - `readme.md` - Auto-generated documentation

### Stencil Configuration (`stencil.config.ts`)

- **Namespace**: `stencil-storybook-vite`
- **Output Targets**:
  - `dist` - Standard distribution with ESM loader
  - `dist-custom-elements` - Custom elements with auto-define behavior
  - `docs-readme` - Auto-generated component documentation
  - `www` - Dev server static site
- **Global Styles**: `src/global-styles/main.css`
- **Testing**: Ignores `.wireit` cache directories

### Storybook Integration

- **Framework**: `@storybook/web-components-vite`
- **Stories Location**: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- **Static Assets**: Maps `dist/stencil-storybook-vite` to `/stencil-storybook-vite`
- **Custom Elements**: Loaded via `defineCustomElements()` in preview
- **Hot Reload Fix**: Uses `dist-vite` outDir to prevent conflicts with Stencil builds

### TypeScript Configuration

- **Module Resolution**: `bundler` mode for Vite compatibility
- **JSX**: React-style with Stencil's `h` function
- **Custom Types**: `types/rollup-parseAst.d.ts` resolves Vite 5+ subpath import issues

### Package Management

- **Required**: pnpm 10.x (enforced by preinstall script)
- **Exports**: Supports both ESM/CJS with subpath exports for components and loader

## Development Patterns

### Adding New Components

1. Use `pnpm stencil:generate` for scaffolding
2. Component files should follow the existing structure in `src/components/`
3. Add Storybook stories using Lit templates with `ifDefined` for optional props
4. Export types from `src/index.ts` (utilities only, not components)

### Story Writing

- Use `Components.ComponentName` types for story args
- Import and use `ifDefined` from `lit/directives/if-defined.js` for optional props
- Structure: `title: 'Components/ComponentName'`

### Testing Approach

- Unit tests: `*.spec.ts` files using Jest
- E2E tests: `*.e2e.ts` files using Stencil's test runner
- Both run with `pnpm test` command

### Build Outputs

- **dist/**: Standard Stencil distribution
- **loader/**: ESM loader for component registration
- **storybook-static/**: Built Storybook site
- **www/**: Stencil dev server output

# Dependency Update Summary

## Overview
All dependencies in the rsbuild_demo project have been updated to their latest stable versions as of November 2025.

## Major Version Updates

### Runtime Dependencies
- **pinia**: 2.2.8 → 3.0.4 (v2 → v3)
  - Breaking changes may exist; verify store implementations
  
### Build & Development Tools
- **tailwindcss**: 3.4.15 → 4.1.17 (v3 → v4)
  - **BREAKING CHANGE**: Requires migration to new plugin system
  - Added: `@tailwindcss/postcss` package
  - Updated: PostCSS configuration
  - Updated: CSS import syntax (from `@tailwind` directives to `@import 'tailwindcss'`)
  
- **vue-tsc**: 2.1.10 → 3.1.4 (v2 → v3)
- **unplugin-vue-components**: 0.26.0 → 30.0.0
- **@types/node**: 20.17.9 → 24.10.1
- **axios-mock-adapter**: 1.22.0 → 2.1.0
- **cross-env**: 7.0.3 → 10.1.0
- **globals**: 15.13.0 → 16.5.0

## Minor/Patch Updates

### Runtime Dependencies
- axios: 1.7.8 → 1.13.2
- vant: 4.9.9 → 4.9.21
- vue: 3.5.13 → 3.5.24
- vue-router: 4.5.0 → 4.6.3

### Build Tools (Rsbuild & Plugins)
- @rsbuild/core: 1.1.7 → 1.6.7
- @rsbuild/plugin-assets-retry: 1.0.6 → 1.5.0
- @rsbuild/plugin-babel: 1.0.3 → 1.0.6
- @rsbuild/plugin-check-syntax: 1.1.0 → 1.6.0
- @rsbuild/plugin-css-minimizer: 1.0.2 → 1.1.0
- @rsbuild/plugin-image-compress: 1.0.2 → 1.3.1
- @rsbuild/plugin-rem: 1.0.2 → 1.0.4
- @rsbuild/plugin-sass: 1.1.1 → 1.4.0
- @rsbuild/plugin-type-check: 1.1.0 → 1.3.0
- @rsbuild/plugin-vue: 1.0.5 → 1.2.0
- @rsbuild/plugin-vue-jsx: 1.0.1 → 1.1.1

### Linting & Formatting
- @eslint/js: 9.16.0 → 9.39.1
- eslint: 9.16.0 → 9.39.1
- typescript-eslint: 8.16.0 → 8.47.0
- prettier: 3.4.1 → 3.6.2

### Type Definitions & Utilities
- @types/webpack-env: 1.18.5 → 1.18.8
- @vant/auto-import-resolver: 1.2.1 → 1.3.0
- typescript: 5.7.2 → 5.9.3

## Files Modified

1. **package.json** - All dependency version updates
2. **pnpm-lock.yaml** - Lockfile regenerated
3. **postcss.config.cjs** - Changed from `tailwindcss` to `@tailwindcss/postcss`
4. **src/styles/main.scss** - Updated Tailwind CSS import syntax
5. **components.d.ts** - Auto-generated, updated by unplugin-vue-components

## Verification

✅ All builds complete successfully
✅ No outdated dependencies remaining  
✅ TypeScript type checking passes
✅ Development server starts without errors
✅ Production build generates expected output

## Migration Notes for Tailwind CSS v4

The most significant change in this update is the migration from Tailwind CSS v3 to v4. Key changes:

1. **PostCSS Plugin**: Now requires `@tailwindcss/postcss` as a separate package
2. **Import Syntax**: Changed from multiple `@tailwind` directives to a single `@import 'tailwindcss'`
3. **Configuration**: The existing `tailwind.config.js` continues to work with v4

For more details on Tailwind CSS v4 changes, see: https://tailwindcss.com/docs/upgrade-guide

## Testing Recommendations

While the build passes all checks, it's recommended to:

1. Test all UI components that use Tailwind CSS classes
2. Verify Pinia stores work correctly with v3
3. Test any features that depend on axios
4. Run end-to-end tests if available
5. Verify mobile layouts (project uses REM-based responsive design)


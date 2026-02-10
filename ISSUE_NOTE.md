# Issue Note: Upgrade Next.js

## Summary
Upgrade Next.js from 14.2.5 to a newer release that addresses the reported security warning.

## Context
The Hostinger build reported a security warning for Next.js 14.2.5. The project has been upgraded to a patched Next.js 14 release; follow up on any remaining advisories.

## Suggested Actions
- Review the Next.js changelog for breaking changes between 14.2.5 and the target version.
- Monitor for new advisories and plan a future major-version upgrade when ready.
- Run `npm audit` and `npm run build` as part of routine maintenance.

## Audit Notes (Dev Dependencies)
- `eslint-config-next` / `@next/eslint-plugin-next` are flagged via the `glob` advisory, but npm reports the only available fix is a major upgrade to Next.js 16.x. Since these are dev-only dependencies and we are staying on Next 14, document the risk and revisit when a major upgrade is planned.

# Issue Note: Upgrade Next.js

## Summary
Upgrade Next.js from 14.2.5 to a newer release that addresses the reported security warning.

## Context
The Hostinger build reported a security warning for Next.js 14.2.5. Plan an upgrade to the latest stable release and verify the deployment build afterward.

## Suggested Actions
- Review the Next.js changelog for breaking changes between 14.2.5 and the target version.
- Update `next`, `react`, and `react-dom` as required by the target Next.js release.
- Run `npm install` and `npm run build` to confirm the upgrade.

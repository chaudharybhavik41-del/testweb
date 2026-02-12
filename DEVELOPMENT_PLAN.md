# Development Plan

## Plate Weight Calculator v1 (Freemium)
- Support material presets (Steel, Aluminium, Stainless, Custom density override).
- Persist line-item table state in localStorage (`mmtk:plate-weight:v1`).
- Free tier: rectangle rows with row cap and upgrade CTA.
- Premium tier: report header fields, rate-per-kg cost estimate, and print/PDF export strategy.
- Print route uses localStorage data and browser print (no server dependency).
# Mechanical Manufacturing Toolkit — Development Plan (Freemium Strategy)

**Doc version:** v1.0  
**Last updated:** 2026-02-10  
**Product:** Mechanical Manufacturing Toolkit (Next.js web app)  
**Core strategy:** Free tools with **limited usage**, premium unlocks **more rows + advanced shapes + standards libraries + exports + saved projects**.

---

## 1) Product Vision

Build a fast, engineer-friendly toolkit website that:
- Helps mechanical/fabrication/industrial users calculate material weights, quantities, and estimates quickly.
- Builds trust through useful free features.
- Converts power users to paid plans via clear, fair limits and premium upgrades.

**Key principle:** Tools first. Content supports tools (not the other way around).

---

## 2) Target Users (Personas)

1) **Fabrication shop owner / estimator**
- Needs quick weight totals for buying steel and quoting jobs.
- Wants multi-line tables, totals by thickness/size, and export to Excel/PDF.

2) **Mechanical engineer / production planner**
- Wants repeatable calculations, saved projects, and standard section references.
- Later: BOM maker + RFQ pack.

3) **Students / trainees**
- Use free calculators; may become paid later as professionals.
- Great for SEO + word-of-mouth.

---

## 3) Monetization Strategy (Freemium → Premium)

### Freemium concept
Each calculator is useful for free, but **advanced workflow requires premium**.

**Free plan**
- Limited rows per table (e.g., **3 lines**)
- Basic shapes only (e.g., rectangular plate only)
- No exports / limited exports
- No saved projects (or extremely limited)

**Premium plan**
- Unlimited rows
- Advanced shapes (circle plate, ring, ribs, etc.)
- Group totals (e.g., totals by thickness/diameter)
- Save projects + history
- Export (Excel/PDF)
- Standards libraries / section lookups (where allowed)
- Later: BOM maker + RFQ

### Why this works
- Free users can verify value immediately.
- Limits are “soft walls” that trigger only when the user is truly engaged.
- Upgrades feel logical: “I want to do more of what already works.”

---

## 4) Product Pillars (Non‑negotiables)

1) **Accuracy + Transparency**
- Show formulas and units.
- Clear rounding rules.
- Disclaimer: estimation only.

2) **Speed**
- Fast page loads.
- Instant calculation updates (client-side).

3) **Usability**
- Multi-row tables, totals, grouping, copy/export.
- Mobile-friendly input.

4) **Trust**
- Clean UI, no spam.
- Premium features clearly explained.

---

## 5) Calculator Feature Design (Core Pattern)

All calculators follow this structure:
- **Header:** tool name + short description + disclaimer
- **Inputs:** table-based entry (multiple line items)
- **Output:** per-line weight + totals
- **Totals:** grand total + grouped totals (e.g., by thickness)
- **Actions:** copy totals, reset, (premium) export/save

### Gating pattern
- **UI limit:** free users can add up to N rows (N=3).
- **Premium unlock:** unlimited rows + advanced shapes + export/save.
- **Server enforcement:** any premium action (export/save/share) validates entitlement.

> Note: Calculator math can run client-side, but premium actions must be enforced server-side.

---

## 6) Calculator Roadmap

### Phase 1 — Launchable Free Toolkit (3 calculators)
**Goal:** A public toolkit that feels “real” and builds trust.

**Calculator #1: Plate Weight (Rectangular)**
- Free:
  - Up to 3 rows
  - Rectangle plate only
  - Totals: per-row + grand total + totals by thickness
- Premium:
  - Unlimited rows
  - Shapes: circle plate, ring/annulus, ribs (see Phase 3)
  - Export/save

**Calculator #2: Round Bar Weight (Solid Round)**
- Free: 3 rows, solid only, totals + grouped by diameter
- Premium: unlimited rows + additional shapes (hex, square bar) + export/save

**Calculator #3: Pipe/Tube Weight**
- Free: 3 rows, OD + thickness + length, validation (thickness < OD/2), grouped totals by OD
- Premium: unlimited rows + schedule tables + standard sizes + export/save

Deliverables for Phase 1:
- `/tools` index listing all tools
- Individual pages for each calculator
- Shared calculator engine in `src/lib/calculators/*`
- Unit tests for formulas
- Consistent UI components

---

### Phase 2 — Freemium Foundation
**Goal:** Start converting users.

Features:
- Simple user accounts (email login or full auth)
- Plan/entitlement model (Free vs Premium)
- Usage rules configuration (row limits, export limits)
- Upgrade CTA and pricing page (static initially)

Deliverables:
- `/pricing`
- Entitlement check utilities
- Feature flags: `canAddRows`, `canUseAdvancedShapes`, `canExport`, `canSave`

---

### Phase 3 — Premium Expansion (Per-tool Premium Features)
**Goal:** Make premium “worth it”.

Plate premium:
- Advanced shapes:
  - Circle plate
  - Ring (outer dia + inner dia)
  - Optional rib patterns (define rib as rectangle strips or simplified model)
- Export: Excel first, PDF second
- Save calculation sets as “Projects”

Bar premium:
- Hex / square bar
- Multiple materials presets (density presets)

Pipe premium:
- Standard sizes selection
- Schedule dropdown (if we can provide licensed/allowed data; else allow user import)

---

### Phase 4 — Engineering Suite (Premium-first modules)
**Goal:** Expand into industrial calculators that users pay for.

Planned premium calculators:
- **Structural steel calculators**
  - Weight per meter & totals for common sections
  - “IS 808 section library” support:
    - Recommended approach: **user-importable section table** (CSV) + optional licensed built-in dataset
    - Avoid copying copyrighted standard tables directly without permission
- **Welding calculators**
  - Fillet weld volume approximation, consumable estimate (with disclaimers)
- **Painting calculator**
  - Surface area + paint consumption estimate
- **Misc**
  - Bolt weight, plate nesting rough estimate, etc.

---

### Phase 5 — BOM Maker & RFQ Pack (Premium flagship)
**Goal:** Highest monetization module.

BOM Maker v1:
- Build a BOM with line items (material, qty, unit, dims)
- Totals (weight, cost placeholder)
- Export Excel/CSV
- Later: vendor RFQ pack

---

## 7) Pricing/Tiers (Draft — can adjust)

**Free**
- 3 rows per calculator table
- Basic shapes only
- No save/export (or very limited export with watermark)
- No project history

**Pro**
- Unlimited rows
- Advanced shapes
- Save projects + history
- Excel export (CSV/XLSX)
- PDF export (optional)

**Business**
- Multi-user / team
- Shared projects
- RFQ module
- Priority support
- Custom templates

---

## 8) Technical Architecture (Next.js)

### Stack
- Next.js App Router (TypeScript)
- Shared UI components in `src/components`
- Calculator formulas in `src/lib/calculators`
- Route groups:
  - `src/app/(public)/` for public pages
  - `src/app/(app)/` for premium app routes (later)
- Tests:
  - Unit tests for formulas (Vitest/Jest)

### Data (Phase 2+)
- Database for:
  - users
  - subscriptions/entitlements
  - saved projects (premium)
  - leads (optional)
- Prefer MySQL/Postgres in production.

### Entitlements + limits
- Central check function:
  - `getUserPlan()`
  - `canUseFeature(featureKey)`
- Feature keys:
  - `rows_per_calc`
  - `advanced_shapes`
  - `export_excel`
  - `export_pdf`
  - `save_projects`
  - `is808_library`

---

## 9) Hosting & Deployment Notes (Hostinger Shared + Node)

- Keep calculators mostly client-side for speed and fewer server costs.
- Premium actions (export/save) must be server-side and enforce plan checks.
- Avoid heavy background jobs initially (PDF rendering can be added later with a lightweight approach).
- Keep dependencies minimal and stable.

---

## 10) Quality Checklist (Definition of Done)

For every calculator page:
- [ ] Formula tested with unit tests
- [ ] Clear units + validation
- [ ] Multi-row table with totals
- [ ] Group totals (e.g., by thickness/diameter)
- [ ] Free limit enforced in UI (rows)
- [ ] Premium hooks present (upgrade CTA where blocked)
- [ ] `npm run build` passes
- [ ] Mobile usability checked

---

## 11) Development Workflow

- Use small PRs (one calculator per PR).
- Every PR must:
  - include tests for formula logic
  - pass `npm run build`
- Keep `DEVELOPMENT_PLAN.md` updated when scope changes.

---

## 12) Immediate Next Actions (Sprint Order)

Sprint A — Core Trust Builders
1) Implement Plate Weight (multi-row, grouped totals, free 3 rows)
2) Implement Round Bar (multi-row, grouped totals, free 3 rows)
3) Implement Pipe (multi-row, grouped totals, free 3 rows)
4) Update `/tools` index with all calculators

Sprint B — Monetization Foundation
5) Add pricing page
6) Add user accounts
7) Add entitlement model + premium gating for advanced shapes/export/save

Sprint C — Premium Modules
8) Plate premium shapes
9) Export Excel/PDF
10) Save projects/history

---

## Appendix: Formula Notes (for implementation)

- Plate rectangle volume (m³) = (L_mm/1000) * (W_mm/1000) * (T_mm/1000)
- Weight (kg) = volume * density(kg/m³) * qty

- Round bar area (m²) = π * (d_m²) / 4
- Pipe area (m²) = π * (OD_m² - ID_m²) / 4, ID = OD - 2t

Rounding:
- Show 3 decimals for kg, 2 decimals for totals (configurable)

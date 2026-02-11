# Development Plan

## Plate Weight Calculator v1 (Freemium)
- Support material presets (Steel, Aluminium, Stainless, Custom density override).
- Persist line-item table state in localStorage (`mmtk:plate-weight:v1`).
- Free tier: rectangle rows with row cap and upgrade CTA.
- Premium tier: report header fields, rate-per-kg cost estimate, and print/PDF export strategy.
- Print route uses localStorage data and browser print (no server dependency).

export default function BomBuilderPage() {
  return (
    <main>
      <section style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          BOM Builder
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "640px" }}>
          Placeholder workspace for premium BOM editing. Add part lists, suppliers,
          and revision controls here.
        </p>
      </section>
      <section
        style={{
          borderRadius: "16px",
          border: "1px dashed var(--border)",
          padding: "24px",
          background: "var(--surface)"
        }}
      >
        <p style={{ color: "var(--muted)" }}>
          Future module: drag-and-drop BOM rows, pricing analytics, and
          collaboration feeds.
        </p>
      </section>
    </main>
  );
}

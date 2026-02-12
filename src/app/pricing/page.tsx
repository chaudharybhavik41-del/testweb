import Link from "next/link";

export default function PricingPage() {
  return (
    <main>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Pricing</h1>
      <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
        Start free and upgrade when you need advanced estimation workflows.
      </p>

      <section style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <article style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}>
          <h2>Free</h2>
          <ul style={{ paddingLeft: "18px", marginTop: "8px" }}>
            <li>Up to 3 plate rows</li>
            <li>Rectangle shape</li>
            <li>Basic totals & thickness breakdown</li>
          </ul>
        </article>
        <article style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}>
          <h2>Premium</h2>
          <ul style={{ paddingLeft: "18px", marginTop: "8px" }}>
            <li>Unlimited rows</li>
            <li>Advanced shapes (Circle, Ring, Ribs)</li>
            <li>Cost estimate totals</li>
            <li>Header fields (Company/Project/Grade/Date)</li>
            <li>PDF export (print-friendly)</li>
          </ul>
        </article>
      </section>

      <p style={{ marginTop: "18px" }}>
        <Link href="/tools" style={{ color: "var(--accent)", fontWeight: 600 }}>
          Browse tools
        </Link>
      </p>
    </main>
  );
}

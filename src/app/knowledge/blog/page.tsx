const posts = [
  {
    title: "Optimizing CNC Throughput",
    summary: "Reduce changeovers and keep spindles cutting with lean scheduling."
  },
  {
    title: "BOM Hygiene for Product Teams",
    summary: "Govern revisions, alternates, and sourcing data from day one."
  },
  {
    title: "Design for Manufacture Review Checklist",
    summary: "Standardize reviews that cut scrap and improve yield."
  }
];

export default function BlogPage() {
  return (
    <main>
      <section style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Knowledge Base
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "640px" }}>
          Articles and guides to help manufacturing teams adopt repeatable,
          production-ready workflows.
        </p>
      </section>
      <section style={{ display: "grid", gap: "16px" }}>
        {posts.map((post) => (
          <article
            key={post.title}
            style={{
              padding: "16px 20px",
              background: "var(--surface)",
              borderRadius: "12px",
              border: "1px solid var(--border)"
            }}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "4px" }}>{post.title}</h2>
            <p style={{ color: "var(--muted)" }}>{post.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

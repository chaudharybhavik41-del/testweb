import SectionCard from "@/components/SectionCard";
import { calculators } from "@/lib/calculators/catalog";

export default function ToolsPage() {
  return (
    <main>
      <section style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Tools</h1>
        <p style={{ color: "var(--muted)", maxWidth: "680px" }}>
          Quick calculators for common fabrication and manufacturing weight estimates.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}
      >
        {calculators.map((item) => (
          <SectionCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
          />
        ))}
      </section>
    </main>
  );
}

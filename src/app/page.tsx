import SectionCard from "@/components/SectionCard";
import { primaryNav } from "@/lib/navigation";

export default function HomePage() {
  return (
    <main>
      <section style={{ marginBottom: "48px" }}>
        <p style={{ color: "var(--accent)", fontWeight: 600 }}>
          Mechanical Manufacturing Toolkit
        </p>
        <h1 style={{ fontSize: "2.5rem", margin: "12px 0" }}>
          Practical tools and knowledge for modern manufacturing teams.
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "680px" }}>
          Explore calculators, production insights, and premium BOM workflows built
          for mechanical engineering organizations.
        </p>
      </section>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}
      >
        {primaryNav.map((item) => (
          <SectionCard
            key={item.href}
            title={item.label}
            description={item.description ?? "Learn more."}
            href={item.href}
          />
        ))}
      </section>
    </main>
  );
}

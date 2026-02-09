import SectionCard from "@/components/SectionCard";

const calculators = [
  {
    title: "Machining Cycle Estimator",
    description: "Estimate spindle time, feeds, and tool changes."
  },
  {
    title: "Sheet Metal Costing",
    description: "Project material usage, scrap rate, and setup time."
  },
  {
    title: "Assembly Labor Planner",
    description: "Balance takt time against line staffing requirements."
  }
];

export default function CalculatorsPage() {
  return (
    <main>
      <section style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Tools & Calculators
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "640px" }}>
          Public-ready calculators for quoting, machining, and production
          planning. Replace these placeholders with live tools as you build them.
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
            href="#"
          />
        ))}
      </section>
    </main>
  );
}

import SectionCard from "@/components/SectionCard";

const calculators = [
  {
    title: "Pipe/Tube Weight",
    description: "Estimate total cut weight and kg per meter for tubes.",
    href: "/tools/pipe-weight"
  },
  {
    title: "Round Bar Weight",
    description: "Estimate total cut weight and kg per meter.",
    href: "/tools/round-bar-weight"
  },
  {
    title: "Plate Weight",
    description: "Estimate weight from plate dimensions and density.",
    href: "/tools/plate-weight"
  },
  {
    title: "Machining Cycle Estimator",
    description: "Estimate spindle time, feeds, and tool changes.",
    href: "#"
  },
  {
    title: "Sheet Metal Costing",
    description: "Project material usage, scrap rate, and setup time.",
    href: "#"
  },
  {
    title: "Assembly Labor Planner",
    description: "Balance takt time against line staffing requirements.",
    href: "#"
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
            href={item.href}
          />
        ))}
      </section>
    </main>
  );
}

import Link from "next/link";

import { premiumNav } from "@/lib/navigation";

export default function PremiumAppPage() {
  return (
    <main>
      <section style={{ marginBottom: "24px" }}>
        <p style={{ color: "var(--accent)", fontWeight: 600 }}>
          Premium Workspace
        </p>
        <h1 style={{ fontSize: "2.1rem", marginBottom: "8px" }}>
          BOM Command Center
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "640px" }}>
          This area is reserved for authenticated customers. Add your auth
          provider and route protection middleware to gate premium features.
        </p>
      </section>
      <section style={{ display: "grid", gap: "12px" }}>
        {premiumNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--surface)"
            }}
          >
            {item.label}
          </Link>
        ))}
      </section>
    </main>
  );
}

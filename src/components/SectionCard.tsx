import Link from "next/link";

type SectionCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function SectionCard({ title, description, href }: SectionCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "20px",
        borderRadius: "16px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.06)",
        transition: "transform 0.2s ease"
      }}
    >
      <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
        {title}
      </div>
      <p style={{ color: "var(--muted)" }}>{description}</p>
    </Link>
  );
}

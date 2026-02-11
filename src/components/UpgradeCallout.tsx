import Link from "next/link";

export default function UpgradeCallout({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "12px",
        background: "var(--surface)"
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: "4px" }}>{title}</p>
      <p style={{ color: "var(--muted)", marginBottom: "8px" }}>{description}</p>
      <Link href="/pricing" style={{ color: "var(--accent)", fontWeight: 600 }}>
        Upgrade to Premium
      </Link>
    </div>
  );
}

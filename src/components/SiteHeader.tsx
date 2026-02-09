import Link from "next/link";

import { primaryNav } from "@/lib/navigation";

export default function SiteHeader() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          maxWidth: "1080px",
          margin: "0 auto"
        }}
      >
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Mechanical Manufacturing Toolkit
        </Link>
        <div style={{ display: "flex", gap: "16px", fontSize: "0.95rem" }}>
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

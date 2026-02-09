export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  {
    label: "Tools & Calculators",
    href: "/tools/calculators",
    description: "Costing, throughput, and machining estimators."
  },
  {
    label: "Knowledge Base",
    href: "/knowledge/blog",
    description: "Guides, process notes, and best practices."
  },
  {
    label: "Premium BOM",
    href: "/app",
    description: "Secure BOM workflows and collaboration."
  }
];

export const premiumNav: NavLink[] = [
  {
    label: "BOM Command Center",
    href: "/app"
  },
  {
    label: "BOM Builder",
    href: "/app/bom"
  }
];

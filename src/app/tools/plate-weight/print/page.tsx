"use client";

import Link from "next/link";
import { useMemo } from "react";

import UpgradeCallout from "@/components/UpgradeCallout";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getPlan } from "@/lib/freemium";
import { calculatePlateWeightKg } from "@/lib/calculators/weight";

type Row = {
  id: string;
  shape: string;
  materialPreset: string;
  densityKgM3: string;
  lengthMm: string;
  widthMm: string;
  thicknessMm: string;
  qty: string;
};

type PlateState = {
  rows: Row[];
  companyName: string;
  date: string;
  projectName: string;
  materialGrade: string;
  ratePerKg: string;
};

const STORAGE_KEY = "mmtk:plate-weight:v1";

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function PlateWeightPrintPage() {
  const { isPremium } = getPlan();
  const { state, hydrated } = useLocalStorageState<PlateState>(STORAGE_KEY, {
    rows: [],
    companyName: "",
    date: "",
    projectName: "",
    materialGrade: "",
    ratePerKg: ""
  });

  const rows = useMemo(() => {
    return state.rows.map((row) => {
      const weightPerPc = calculatePlateWeightKg({
        lengthMm: toNumber(row.lengthMm),
        widthMm: toNumber(row.widthMm),
        thicknessMm: toNumber(row.thicknessMm),
        densityKgM3: toNumber(row.densityKgM3)
      });
      const lineTotal = weightPerPc * toNumber(row.qty);
      return { ...row, weightPerPc, lineTotal };
    });
  }, [state.rows]);

  const totalKg = rows.reduce((sum, row) => sum + row.lineTotal, 0);

  if (!hydrated) {
    return <main>Loading...</main>;
  }

  if (!isPremium) {
    return (
      <main>
        <nav style={{ marginBottom: "12px" }}>
          <Link href="/tools/plate-weight" style={{ color: "var(--muted)", textDecoration: "none" }}>
            ← Back to Plate Calculator
          </Link>
        </nav>
        <UpgradeCallout
          title="PDF export is a Premium feature"
          description="Upgrade to generate printable PDF-style reports."
        />
      </main>
    );
  }

  return (
    <main>
      <nav style={{ marginBottom: "12px" }}>
        <Link href="/tools/plate-weight" style={{ color: "var(--muted)", textDecoration: "none" }}>
          ← Back to Plate Calculator
        </Link>
      </nav>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Plate Weight Report</h1>
      <p style={{ marginBottom: "16px", color: "var(--muted)" }}>
        {state.companyName || "-"} | {state.projectName || "-"} | {state.date || "-"} | Grade: {state.materialGrade || "-"}
      </p>
      <button type="button" onClick={() => window.print()} style={{ marginBottom: "16px" }}>
        Print / Save as PDF
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Shape", "Preset", "Density", "L", "W", "T", "Qty", "Wt/pc", "Line kg"].map((h) => (
              <th key={h} style={{ borderBottom: "1px solid var(--border)", textAlign: "left", padding: "8px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.shape}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.materialPreset}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.densityKgM3}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.lengthMm}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.widthMm}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.thicknessMm}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.qty}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.weightPerPc.toFixed(3)}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{row.lineTotal.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: "16px", fontWeight: 600 }}>Total: {totalKg.toFixed(3)} kg ({(totalKg / 1000).toFixed(4)} ton)</p>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo } from "react";

import UpgradeCallout from "@/components/UpgradeCallout";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getPlan } from "@/lib/freemium";
import { calculatePlateWeightKg } from "@/lib/calculators/weight";

const STORAGE_KEY = "mmtk:plate-weight:v1";
const FREE_MAX_ROWS = 3;

const materialPresetDensities = {
  Steel: 7850,
  Aluminium: 2700,
  Stainless: 8000
} as const;

type MaterialPreset = keyof typeof materialPresetDensities | "Custom";
type Shape = "Rectangle" | "Circle (Premium)" | "Ring (Premium)" | "Ribs (Premium)";

type Row = {
  id: string;
  shape: Shape;
  materialPreset: MaterialPreset;
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

const defaultRow = (): Row => ({
  id: `${Date.now()}-${Math.random()}`,
  shape: "Rectangle",
  materialPreset: "Steel",
  densityKgM3: "7850",
  lengthMm: "1000",
  widthMm: "500",
  thicknessMm: "10",
  qty: "1"
});

const defaultState: PlateState = {
  rows: [defaultRow()],
  companyName: "",
  date: "",
  projectName: "",
  materialGrade: "",
  ratePerKg: ""
};

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function rowWeightPerPc(row: Row) {
  return calculatePlateWeightKg({
    lengthMm: toNumber(row.lengthMm),
    widthMm: toNumber(row.widthMm),
    thicknessMm: toNumber(row.thicknessMm),
    densityKgM3: toNumber(row.densityKgM3)
  });
}

export default function PlateWeightPage() {
  const { isPremium } = getPlan();
  const { state, setState, hydrated } = useLocalStorageState<PlateState>(
    STORAGE_KEY,
    defaultState
  );

  const rows = state.rows;

  const computedRows = useMemo(() => {
    return rows.map((row) => {
      const weightPerPc = rowWeightPerPc(row);
      const qty = toNumber(row.qty);
      const lineTotalKg = weightPerPc * qty;
      return { row, weightPerPc, lineTotalKg };
    });
  }, [rows]);

  const grandTotalKg = computedRows.reduce((sum, r) => sum + r.lineTotalKg, 0);
  const grandTotalTon = grandTotalKg / 1000;

  const groupedByThickness = useMemo(() => {
    const map = new Map<number, number>();
    for (const r of computedRows) {
      const thk = toNumber(r.row.thicknessMm);
      map.set(thk, (map.get(thk) ?? 0) + r.lineTotalKg);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [computedRows]);

  const estimatedTotalCost = isPremium ? grandTotalKg * toNumber(state.ratePerKg) : null;

  const updateRow = (id: string, patch: Partial<Row>) => {
    setState({
      ...state,
      rows: rows.map((row) => (row.id === id ? { ...row, ...patch } : row))
    });
  };

  const onPresetChange = (id: string, preset: MaterialPreset) => {
    if (preset === "Custom") {
      updateRow(id, { materialPreset: preset });
      return;
    }
    updateRow(id, {
      materialPreset: preset,
      densityKgM3: String(materialPresetDensities[preset])
    });
  };

  const addRow = () => {
    if (!isPremium && rows.length >= FREE_MAX_ROWS) {
      return;
    }
    setState({ ...state, rows: [...rows, defaultRow()] });
  };

  const removeRow = (id: string) => {
    if (rows.length === 1) {
      return;
    }
    setState({ ...state, rows: rows.filter((row) => row.id !== id) });
  };

  const resetAll = () => setState(defaultState);

  const copyTotals = async () => {
    const breakdown = groupedByThickness
      .map(([thk, kg]) => `- ${thk} mm: ${kg.toFixed(2)} kg`)
      .join("\n");
    const text = `Grand total: ${grandTotalKg.toFixed(2)} kg (${grandTotalTon.toFixed(3)} ton)\nBy thickness:\n${breakdown}`;
    await navigator.clipboard.writeText(text);
  };

  if (!hydrated) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <nav style={{ marginBottom: "12px" }}>
        <Link href="/tools" style={{ color: "var(--muted)", textDecoration: "none" }}>
          ← Back to Tools
        </Link>
      </nav>

      <section style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Plate Weight Calculator</h1>
        <p style={{ color: "var(--muted)", maxWidth: "760px" }}>
          Multi-line estimator for rectangle plate weight. Free plan supports up to 3 rows.
        </p>
      </section>

      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "16px",
          opacity: isPremium ? 1 : 0.8
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>Premium Report Header & Costing</h2>
        {!isPremium ? (
          <UpgradeCallout
            title="Premium feature"
            description="Unlock report headers, cost estimate, and PDF export."
          />
        ) : null}

        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            marginTop: "10px"
          }}
        >
          {([
            ["companyName", "Company Name"],
            ["date", "Date"],
            ["projectName", "Project Name"],
            ["materialGrade", "Material Grade"],
            ["ratePerKg", "Rate per kg (₹/kg)"]
          ] as const).map(([key, label]) => (
            <label key={key} style={{ display: "grid", gap: "4px" }}>
              <span>{label}</span>
              <input
                disabled={!isPremium}
                type={key === "ratePerKg" ? "number" : key === "date" ? "date" : "text"}
                value={state[key]}
                onChange={(e) => setState({ ...state, [key]: e.target.value })}
                style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "8px" }}
              />
            </label>
          ))}
        </div>
      </section>

      <section style={{ overflowX: "auto", marginBottom: "14px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1150px" }}>
          <thead>
            <tr>
              {["Shape", "Material Preset", "Density (kg/m3)", "Length (mm)", "Width (mm)", "Thickness (mm)", "Qty", "Weight/pc (kg)", "Line total (kg)", "Line Cost", "Remove"].map((h) => (
                <th key={h} style={{ textAlign: "left", borderBottom: "1px solid var(--border)", padding: "8px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {computedRows.map(({ row, weightPerPc, lineTotalKg }) => {
              const lineCost = toNumber(state.ratePerKg) * lineTotalKg;

              return (
                <tr key={row.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    <select
                      value={row.shape}
                      onChange={(e) => updateRow(row.id, { shape: e.target.value as Shape })}
                      style={{ width: "100%" }}
                    >
                      <option>Rectangle</option>
                      <option disabled>Circle (Premium)</option>
                      <option disabled>Ring (Premium)</option>
                      <option disabled>Ribs (Premium)</option>
                    </select>
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    <select
                      value={row.materialPreset}
                      onChange={(e) => onPresetChange(row.id, e.target.value as MaterialPreset)}
                      style={{ width: "100%" }}
                    >
                      <option>Steel</option>
                      <option>Aluminium</option>
                      <option>Stainless</option>
                      <option>Custom</option>
                    </select>
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    <input
                      type="number"
                      value={row.densityKgM3}
                      disabled={row.materialPreset !== "Custom"}
                      onChange={(e) => updateRow(row.id, { densityKgM3: e.target.value })}
                      style={{ width: "100%" }}
                    />
                  </td>
                  {([
                    "lengthMm",
                    "widthMm",
                    "thicknessMm",
                    "qty"
                  ] as const).map((key) => (
                    <td key={key} style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                      <input
                        type="number"
                        value={row[key]}
                        onChange={(e) => updateRow(row.id, { [key]: e.target.value })}
                        style={{ width: "100%" }}
                      />
                    </td>
                  ))}
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{weightPerPc.toFixed(3)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>{lineTotalKg.toFixed(3)}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    {isPremium ? `₹ ${lineCost.toFixed(2)}` : "—"}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    <button type="button" onClick={() => removeRow(row.id)} disabled={rows.length === 1}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        <button type="button" onClick={addRow} disabled={!isPremium && rows.length >= FREE_MAX_ROWS}>
          Add Row
        </button>
        <button type="button" onClick={copyTotals}>Copy Totals</button>
        <button type="button" onClick={resetAll}>Reset</button>
        {isPremium ? (
          <Link href="/tools/plate-weight/print">
            <button type="button">Generate PDF</button>
          </Link>
        ) : (
          <button type="button" disabled>Generate PDF</button>
        )}
      </section>

      {!isPremium && rows.length >= FREE_MAX_ROWS ? (
        <section style={{ marginBottom: "16px" }}>
          <UpgradeCallout
            title="Free plan row limit reached"
            description="You can calculate up to 3 line items on the free plan."
          />
        </section>
      ) : null}

      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "16px"
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>Totals</h2>
        <p style={{ marginBottom: "6px" }}>Grand total: <strong>{grandTotalKg.toFixed(3)} kg</strong> ({grandTotalTon.toFixed(4)} ton)</p>
        {isPremium ? (
          <p style={{ marginBottom: "8px" }}>Estimated cost: <strong>₹ {estimatedTotalCost?.toFixed(2)}</strong></p>
        ) : null}
        <h3 style={{ marginBottom: "4px", marginTop: "8px" }}>By thickness</h3>
        <ul style={{ paddingLeft: "18px" }}>
          {groupedByThickness.map(([thk, kg]) => (
            <li key={thk}>{thk} mm: {kg.toFixed(3)} kg</li>
          ))}
        </ul>
      </section>

      <details>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Formula</summary>
        <div style={{ marginTop: "8px", color: "var(--muted)" }}>
          <p>Rectangle plate volume (m³) = (Length mm ÷ 1000) × (Width mm ÷ 1000) × (Thickness mm ÷ 1000).</p>
          <p>Weight per piece (kg) = Volume (m³) × Density (kg/m³).</p>
          <p>Line total (kg) = Weight per piece × Quantity.</p>
          <p style={{ marginTop: "6px" }}>
            Disclaimer: This is an engineering estimate. Actual weight can vary due to tolerances,
            material specification, and manufacturing process.
          </p>
        </div>
      </details>
    </main>
  );
}

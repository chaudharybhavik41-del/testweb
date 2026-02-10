"use client";

import { useMemo, useState } from "react";

import {
  calculateRoundBarKgPerMeter,
  calculateRoundBarWeightKg
} from "@/lib/calculators/weight";

type FieldKey = "diameterMm" | "lengthMm" | "densityKgM3";

const defaultValues = {
  diameterMm: "20",
  lengthMm: "1000",
  densityKgM3: "7850"
};

function validateField(value: string) {
  if (!value.trim()) {
    return "Required.";
  }

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return "Enter a valid number.";
  }
  if (numeric <= 0) {
    return "Must be greater than zero.";
  }

  return "";
}

export default function RoundBarWeightPage() {
  const [values, setValues] = useState(defaultValues);

  const errors = useMemo(() => {
    return {
      diameterMm: validateField(values.diameterMm),
      lengthMm: validateField(values.lengthMm),
      densityKgM3: validateField(values.densityKgM3)
    };
  }, [values]);

  const hasErrors = Object.values(errors).some(Boolean);

  const results = useMemo(() => {
    if (hasErrors) {
      return null;
    }

    const diameterMm = Number(values.diameterMm);
    const lengthMm = Number(values.lengthMm);
    const densityKgM3 = Number(values.densityKgM3);

    return {
      weightKg: calculateRoundBarWeightKg({
        diameterMm,
        lengthMm,
        densityKgM3
      }),
      kgPerMeter: calculateRoundBarKgPerMeter({
        diameterMm,
        densityKgM3
      })
    };
  }, [hasErrors, values]);

  const handleChange =
    (key: FieldKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [key]: event.target.value
      }));
    };

  return (
    <main>
      <section style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Round Bar Weight Calculator
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "680px" }}>
          Estimate round bar weight from diameter, cut length, and material
          density.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginBottom: "24px"
        }}
      >
        {([
          {
            key: "diameterMm",
            label: "Diameter (mm)"
          },
          {
            key: "lengthMm",
            label: "Length (mm)"
          },
          {
            key: "densityKgM3",
            label: "Density (kg/m³)"
          }
        ] as const).map((field) => (
          <label key={field.key} style={{ display: "grid", gap: "6px" }}>
            <span style={{ fontWeight: 600 }}>{field.label}</span>
            <input
              type="number"
              inputMode="decimal"
              value={values[field.key]}
              onChange={handleChange(field.key)}
              style={{
                borderRadius: "8px",
                border: "1px solid var(--border)",
                padding: "10px 12px",
                background: "transparent",
                color: "inherit"
              }}
              min="0"
              step="any"
            />
            {errors[field.key] ? (
              <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
                {errors[field.key]}
              </span>
            ) : null}
          </label>
        ))}
      </section>

      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "20px",
          background: "var(--panel)"
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>Estimated Results</h2>
        <p style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "8px" }}>
          Weight: {results === null ? "--" : `${results.weightKg.toFixed(2)} kg`}
        </p>
        <p style={{ marginBottom: "10px" }}>
          kg per meter: {results === null ? "--" : `${results.kgPerMeter.toFixed(3)} kg/m`}
        </p>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          This calculator provides an estimate. Actual weight can vary due to
          material tolerances, scale, and finishing.
        </p>
      </section>
    </main>
  );
}

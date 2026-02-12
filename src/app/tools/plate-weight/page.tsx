"use client";

import { useMemo, useState } from "react";

import { calculatePlateWeightKg } from "@/lib/calculators/weight";

type FieldKey = "lengthMm" | "widthMm" | "thicknessMm" | "densityKgM3";

const defaultValues = {
  lengthMm: "1000",
  widthMm: "500",
  thicknessMm: "10",
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

export default function PlateWeightPage() {
  const [values, setValues] = useState(defaultValues);

  const errors = useMemo(() => {
    return {
      lengthMm: validateField(values.lengthMm),
      widthMm: validateField(values.widthMm),
      thicknessMm: validateField(values.thicknessMm),
      densityKgM3: validateField(values.densityKgM3)
    };
  }, [values]);

  const hasErrors = Object.values(errors).some(Boolean);

  const weightKg = useMemo(() => {
    if (hasErrors) {
      return null;
    }

    return calculatePlateWeightKg({
      lengthMm: Number(values.lengthMm),
      widthMm: Number(values.widthMm),
      thicknessMm: Number(values.thicknessMm),
      densityKgM3: Number(values.densityKgM3)
    });
  }, [hasErrors, values]);

  const handleChange = (key: FieldKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [key]: event.target.value
    }));
  };

  return (
    <main>
      <section style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
          Plate Weight Calculator
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "680px" }}>
          Estimate the weight of a rectangular plate using metric dimensions and
          material density.
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
            key: "lengthMm",
            label: "Length (mm)"
          },
          {
            key: "widthMm",
            label: "Width (mm)"
          },
          {
            key: "thicknessMm",
            label: "Thickness (mm)"
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
        <h2 style={{ marginBottom: "8px" }}>Estimated Weight</h2>
        <p style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "8px" }}>
          {weightKg === null ? "--" : `${weightKg.toFixed(2)} kg`}
        </p>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          This calculator provides an estimate. Actual weight can vary based on
          material tolerances, coatings, and manufacturing processes.
        </p>
      </section>
    </main>
  );
}

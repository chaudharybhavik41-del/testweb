import { describe, expect, it } from "vitest";

import { calculatePlateWeightKg } from "./weight";

describe("calculatePlateWeightKg", () => {
  it("calculates weight in kilograms for metric inputs", () => {
    const weight = calculatePlateWeightKg({
      lengthMm: 1000,
      widthMm: 500,
      thicknessMm: 10,
      densityKgM3: 7850
    });

    expect(weight).toBeCloseTo(39.25, 5);
  });

  it("returns zero when any dimension is zero", () => {
    const weight = calculatePlateWeightKg({
      lengthMm: 0,
      widthMm: 500,
      thicknessMm: 10,
      densityKgM3: 7850
    });

    expect(weight).toBe(0);
  });
});

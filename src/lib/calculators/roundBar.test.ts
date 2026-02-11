import { describe, expect, it } from "vitest";

import { calculateRoundBarKgPerMeter, calculateRoundBarWeightKg } from "./roundBar";

describe("round bar calculations", () => {
  it("calculates round bar total weight in kilograms", () => {
    const weight = calculateRoundBarWeightKg({
      diameterMm: 20,
      lengthMm: 2000,
      densityKgM3: 7850
    });

    expect(weight).toBeCloseTo(4.9323, 4);
  });

  it("calculates kilograms per meter from diameter and density", () => {
    const kgPerMeter = calculateRoundBarKgPerMeter({
      diameterMm: 20,
      densityKgM3: 7850
    });

    expect(kgPerMeter).toBeCloseTo(2.46615, 5);
  });
});

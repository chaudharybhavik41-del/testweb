import { describe, expect, it } from "vitest";

import {
  calculatePipeKgPerMeter,
  calculatePipeWeightKg,
  calculatePlateWeightKg,
  calculateRoundBarKgPerMeter,
  calculateRoundBarWeightKg
} from "./weight";

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

describe("pipe calculations", () => {
  it("calculates pipe total weight in kilograms", () => {
    const weight = calculatePipeWeightKg({
      outerDiameterMm: 60.3,
      thicknessMm: 3.91,
      lengthMm: 6000,
      densityKgM3: 7850
    });

    expect(weight).toBeCloseTo(32.62493, 5);
  });

  it("calculates pipe kilograms per meter", () => {
    const kgPerMeter = calculatePipeKgPerMeter({
      outerDiameterMm: 60.3,
      thicknessMm: 3.91,
      densityKgM3: 7850
    });

    expect(kgPerMeter).toBeCloseTo(5.43749, 5);
  });
});

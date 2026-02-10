import { describe, expect, it } from "vitest";

import { calculatePipeKgPerMeter, calculatePipeWeightKg } from "./pipe";

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

  it("matches kg per meter to 1 meter total weight", () => {
    const kgPerMeter = calculatePipeKgPerMeter({
      outerDiameterMm: 60.3,
      thicknessMm: 3.91,
      densityKgM3: 7850
    });

    const oneMeterWeight = calculatePipeWeightKg({
      outerDiameterMm: 60.3,
      thicknessMm: 3.91,
      lengthMm: 1000,
      densityKgM3: 7850
    });

    expect(kgPerMeter).toBeCloseTo(oneMeterWeight, 10);
  });
});

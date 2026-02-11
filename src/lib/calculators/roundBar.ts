export type RoundBarWeightInputs = {
  diameterMm: number;
  lengthMm: number;
  densityKgM3: number;
};

function mmToM(valueMm: number): number {
  return valueMm / 1000;
}

export function calculateRoundBarWeightKg({
  diameterMm,
  lengthMm,
  densityKgM3
}: RoundBarWeightInputs): number {
  const radiusM = mmToM(diameterMm) / 2;
  const lengthM = mmToM(lengthMm);
  const volumeM3 = Math.PI * radiusM * radiusM * lengthM;

  return volumeM3 * densityKgM3;
}

export function calculateRoundBarKgPerMeter({
  diameterMm,
  densityKgM3
}: Pick<RoundBarWeightInputs, "diameterMm" | "densityKgM3">): number {
  return calculateRoundBarWeightKg({
    diameterMm,
    lengthMm: 1000,
    densityKgM3
  });
}

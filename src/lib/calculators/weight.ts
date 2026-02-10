export type PlateWeightInputs = {
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  densityKgM3: number;
};

export type RoundBarWeightInputs = {
  diameterMm: number;
  lengthMm: number;
  densityKgM3: number;
};

export type PipeWeightInputs = {
  outerDiameterMm: number;
  thicknessMm: number;
  lengthMm: number;
  densityKgM3: number;
};

function mmToM(valueMm: number): number {
  return valueMm / 1000;
}

export function calculatePlateWeightKg({
  lengthMm,
  widthMm,
  thicknessMm,
  densityKgM3
}: PlateWeightInputs): number {
  const volumeM3 = mmToM(lengthMm) * mmToM(widthMm) * mmToM(thicknessMm);
  return volumeM3 * densityKgM3;
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

export function calculatePipeWeightKg({
  outerDiameterMm,
  thicknessMm,
  lengthMm,
  densityKgM3
}: PipeWeightInputs): number {
  const outerRadiusM = mmToM(outerDiameterMm) / 2;
  const innerRadiusM = outerRadiusM - mmToM(thicknessMm);
  const lengthM = mmToM(lengthMm);
  const volumeM3 = Math.PI * (outerRadiusM ** 2 - innerRadiusM ** 2) * lengthM;

  return volumeM3 * densityKgM3;
}

export function calculatePipeKgPerMeter({
  outerDiameterMm,
  thicknessMm,
  densityKgM3
}: Pick<PipeWeightInputs, "outerDiameterMm" | "thicknessMm" | "densityKgM3">): number {
  return calculatePipeWeightKg({
    outerDiameterMm,
    thicknessMm,
    lengthMm: 1000,
    densityKgM3
  });
}

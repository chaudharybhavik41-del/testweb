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

export function calculatePlateWeightKg({
  lengthMm,
  widthMm,
  thicknessMm,
  densityKgM3
}: PlateWeightInputs): number {
  const volumeM3 =
    (lengthMm / 1000) * (widthMm / 1000) * (thicknessMm / 1000);
  return volumeM3 * densityKgM3;
}

export function calculateRoundBarWeightKg({
  diameterMm,
  lengthMm,
  densityKgM3
}: RoundBarWeightInputs): number {
  const radiusM = (diameterMm / 1000) / 2;
  const lengthM = lengthMm / 1000;
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
  const outerRadiusM = (outerDiameterMm / 1000) / 2;
  const innerRadiusM = outerRadiusM - thicknessMm / 1000;
  const lengthM = lengthMm / 1000;
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

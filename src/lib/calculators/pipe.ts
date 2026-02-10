export type PipeWeightInputs = {
  outerDiameterMm: number;
  thicknessMm: number;
  lengthMm: number;
  densityKgM3: number;
};

function mmToM(valueMm: number): number {
  return valueMm / 1000;
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

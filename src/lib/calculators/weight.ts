export type PlateWeightInputs = {
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
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

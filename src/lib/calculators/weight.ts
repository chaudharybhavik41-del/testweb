import {
  calculatePipeKgPerMeter as calculatePipeKgPerMeterBase,
  calculatePipeWeightKg as calculatePipeWeightKgBase,
  type PipeWeightInputs
} from "./pipe";
import {
  calculateRoundBarKgPerMeter as calculateRoundBarKgPerMeterBase,
  calculateRoundBarWeightKg as calculateRoundBarWeightKgBase,
  type RoundBarWeightInputs
} from "./roundBar";

export type { PipeWeightInputs, RoundBarWeightInputs };

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

export function calculateRoundBarWeightKg(
  inputs: RoundBarWeightInputs
): number {
  return calculateRoundBarWeightKgBase(inputs);
}

export function calculateRoundBarKgPerMeter(
  inputs: Pick<RoundBarWeightInputs, "diameterMm" | "densityKgM3">
): number {
  return calculateRoundBarKgPerMeterBase(inputs);
}

export function calculatePipeWeightKg(inputs: PipeWeightInputs): number {
  return calculatePipeWeightKgBase(inputs);
}

export function calculatePipeKgPerMeter(
  inputs: Pick<PipeWeightInputs, "outerDiameterMm" | "thicknessMm" | "densityKgM3">
): number {
  return calculatePipeKgPerMeterBase(inputs);
}

// glosaSystem.ts
import {
  Vehicle,
  TrafficSignal,
  RoadData,
  EnvironmentalData,
  GLOSAOutput,
  GLOSAParameters,
} from "./types";
import { GLOSACalculator } from "./glosaCalculator";
import { FuelConsumption } from "./fuelConsumption";

export class GLOSASystem {
  private glosaCalculator: GLOSACalculator;

  constructor(fuelModel: FuelConsumption, glosaParams: GLOSAParameters) {
    this.glosaCalculator = new GLOSACalculator(fuelModel, glosaParams);
  }

  getSpeedAdvice(
    vehicle: Vehicle,
    signal: TrafficSignal,
    roadData: RoadData,
    envData: EnvironmentalData
  ): GLOSAOutput {
    return this.glosaCalculator.calculateOptimalTrajectory(
      vehicle,
      signal,
      roadData,
      envData
    );
  }
}

import {
  Vehicle,
  RoadData,
  EnvironmentalData,
  VehicleParameters,
  AIR_DENSITY,
  GRAVITATIONAL_ACCELERATION,
} from "./types";

export class VehicleDynamics {
  static calculateTractiveForce(
    throttle: number,
    speed: number,
    vehicle: Vehicle
  ): number {
    const beta = 0.9; // Example reduction factor
    const mu = 0.7; // Example road adhesion coefficient
    return Math.min(
      (3600 *
        throttle *
        beta *
        vehicle.drivelineEfficiency *
        vehicle.enginePower) /
        speed,
      vehicle.mass * 0.6 * 9.8067 * mu
    );
  }

  static calculateResistanceForce(
    speed: number,
    vehicleParams: VehicleParameters,
    roadGrade: number
  ): number {
    const aerodynamicDrag =
      0.5 *
      AIR_DENSITY *
      vehicleParams.dragCoefficient *
      vehicleParams.frontalArea *
      speed *
      speed;
    const rollingResistance =
      vehicleParams.mass *
      GRAVITATIONAL_ACCELERATION *
      vehicleParams.rollingResistanceCoefficient *
      Math.cos(roadGrade);
    const gravitationalForce =
      vehicleParams.mass * GRAVITATIONAL_ACCELERATION * Math.sin(roadGrade);

    return aerodynamicDrag + rollingResistance + gravitationalForce;
  }

  static calculateAcceleration(
    tractionForce: number,
    resistanceForce: number,
    vehicleMass: number
  ): number {
    return (tractionForce - resistanceForce) / vehicleMass;
  }
}

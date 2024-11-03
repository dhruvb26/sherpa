// fuelConsumption.ts
import { Vehicle, VehicleParameters } from './types';
import { VehicleDynamics } from './vehicleDynamics';

export class FuelConsumption {
  private a0: number;
  private a1: number;
  private a2: number;

  constructor(a0: number, a1: number, a2: number) {
    this.a0 = a0;
    this.a1 = a1;
    this.a2 = a2;
  }

  calculateInstantaneous(power: number): number {
    if (power >= 0) {
      return this.a0 + this.a1 * power + this.a2 * power * power;
    } else {
      return this.a0;
    }
  }

  calculatePower(speed: number, acceleration: number, vehicleParams: VehicleParameters, roadGrade: number): number {
    const resistanceForce = VehicleDynamics.calculateResistanceForce(speed, vehicleParams, roadGrade);
    return (resistanceForce + vehicleParams.mass * acceleration) * speed / 3600; // Convert to kW
  }

  calculateTotalFuelConsumption(speedProfile: number[], accelerationProfile: number[], vehicleParams: VehicleParameters, roadGrade: number, timeStep: number): number {
    let totalFuel = 0;
    for (let i = 0; i < speedProfile.length; i++) {
      const power = this.calculatePower(speedProfile[i], accelerationProfile[i], vehicleParams, roadGrade);
      const instantaneousFuel = this.calculateInstantaneous(power);
      totalFuel += instantaneousFuel * timeStep;
    }
    return totalFuel;
  }
}
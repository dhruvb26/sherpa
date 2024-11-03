// glosaCalculator.ts
import { Vehicle, TrafficSignal, RoadData, EnvironmentalData, GLOSAParameters, VehicleParameters, GLOSAOutput, Coordinate } from './types';
import { VehicleDynamics } from './vehicleDynamics';
import { FuelConsumption } from './fuelConsumption';

export class GLOSACalculator {
  private fuelModel: FuelConsumption;
  private glosaParams: GLOSAParameters;

  constructor(fuelModel: FuelConsumption, glosaParams: GLOSAParameters) {
    this.fuelModel = fuelModel;
    this.glosaParams = glosaParams;
  }

  calculateOptimalTrajectory(vehicle: Vehicle, signal: TrafficSignal, roadData: RoadData, envData: EnvironmentalData): GLOSAOutput {
    const distanceToSignal = this.calculateDistance(vehicle.location, signal.location);
    const timeToSignal = distanceToSignal / vehicle.currentSpeed;

    // Simplified optimization problem
    const optimalSpeed = this.optimizeSpeed(vehicle, distanceToSignal, signal.timeUntilNextPhase, roadData);

    const acceleration = (optimalSpeed - vehicle.currentSpeed) / timeToSignal;
    const estimatedFuelConsumption = this.estimateFuelConsumption(vehicle, optimalSpeed, acceleration, roadData);
    const estimatedTravelTime = distanceToSignal / optimalSpeed;

    return {
      advisorySpeed: optimalSpeed,
      estimatedFuelConsumption,
      estimatedTravelTime,
      estimatedArrivalTime: Date.now() + estimatedTravelTime * 1000,
      recommendedAcceleration: acceleration
    };
  }

  private optimizeSpeed(vehicle: Vehicle, distance: number, timeUntilGreen: number, roadData: RoadData): number {
    // Simplified optimization: find speed that minimizes weighted sum of time and fuel consumption
    let minCost = Infinity;
    let optimalSpeed = vehicle.currentSpeed;

    for (let speed = roadData.speedLimit * 0.5; speed <= roadData.speedLimit; speed += 0.1) {
      const time = distance / speed;
      const acceleration = (speed - vehicle.currentSpeed) / time;
      const fuelConsumption = this.estimateFuelConsumption(vehicle, speed, acceleration, roadData);

      const cost = this.glosaParams.alpha * time + this.glosaParams.beta * fuelConsumption;

      if (cost < minCost && time <= timeUntilGreen) {
        minCost = cost;
        optimalSpeed = speed;
      }
    }

    return optimalSpeed;
  }

  private calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
    const R = 6371e3; // Radius of Earth in meters
    const toRadians = (degrees: number) => degrees * (Math.PI / 180); // Helper function to convert degrees to radians
  
    // Convert latitude and longitude from degrees to radians
    const lat1 = toRadians(coord1.latitude);
    const lat2 = toRadians(coord2.latitude);
    const deltaLat = toRadians(coord2.latitude - coord1.latitude);
    const deltaLon = toRadians(coord2.longitude - coord1.longitude);
  
    // Haversine formula
    const a = Math.sin(deltaLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
  }

  private estimateFuelConsumption(vehicle: Vehicle, speed: number, acceleration: number, roadData: RoadData): number {
    const vehicleParams: VehicleParameters = {
      mass: vehicle.mass,
      frontalArea: vehicle.frontalArea,
      dragCoefficient: 0.3, // Example value
      rollingResistanceCoefficient: 0.01 // Example value
    };

    const power = this.fuelModel.calculatePower(speed, acceleration, vehicleParams, roadData.grade);
    return this.fuelModel.calculateInstantaneous(power);
  }
}
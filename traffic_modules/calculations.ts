import fs from "fs/promises";
import path from "path";
import { GLOSASystem } from "./glosaSystem";
import { FuelConsumption } from "./fuelConsumption";
import { VehicleDynamics } from "./vehicleDynamics";
import {
  Vehicle,
  TrafficSignal,
  RoadData,
  EnvironmentalData,
  Coordinate,
  TrafficData,
} from "./types";

interface SpeedAdvice {
  advisorySpeed: number;
  estimatedFuelConsumption: number;
  recommendedAcceleration: number;
}

interface CalculationResult {
  vehicleId: string;
  newCongestionRate: number;
  idealSpeed: number;
  fuelConsumption: number;
  co2EmissionSaved: number;
  ecoScore: number;
  timeSaved: number;
}

export function performCalculations(data: {
  vehicles: Vehicle[];
  trafficSignals: TrafficSignal[];
  roadData: RoadData;
  environmentalData: EnvironmentalData;
}): CalculationResult[] {
  const fuelModel = new FuelConsumption(0.1, 0.2, 0.3); // Example coefficients
  const glosaParams = {
    alpha: 0.5,
    beta: 0.5,
    gamma: 0,
  };
  const glosaSystem = new GLOSASystem(fuelModel, glosaParams);

  return data.vehicles.map((vehicle) => {
    const nearestSignal = findNearestSignal(vehicle, data.trafficSignals);
    const speedAdvice = glosaSystem.getSpeedAdvice(
      vehicle,
      nearestSignal,
      data.roadData,
      data.environmentalData
    );

    return {
      vehicleId: vehicle.id,
      newCongestionRate: calculateCongestionRate(vehicle, data.vehicles),
      idealSpeed: Math.max(speedAdvice.advisorySpeed, 0), // Ensure non-negative ideal speed
      fuelConsumption: Math.max(speedAdvice.estimatedFuelConsumption, 0), // Ensure non-negative fuel consumption
      co2EmissionSaved: calculateCO2EmissionSaved(
        vehicle.currentSpeed,
        speedAdvice.advisorySpeed,
        data.roadData.upstreamDistance
      ),
      ecoScore: calculateEcoScore(vehicle, speedAdvice, data.roadData),
      timeSaved: calculateTimeSaved(
        vehicle.currentSpeed,
        speedAdvice.advisorySpeed,
        data.roadData.upstreamDistance
      ),
    };
  });
}

function findNearestSignal(
  vehicle: Vehicle,
  signals: TrafficSignal[]
): TrafficSignal {
  return signals.reduce((nearest, signal) => {
    const distance = calculateDistance(vehicle.location, signal.location);
    return distance < calculateDistance(vehicle.location, nearest.location)
      ? signal
      : nearest;
  });
}

function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function calculateCongestionRate(
  vehicle: Vehicle,
  allVehicles: Vehicle[]
): number {
  const nearbyVehicles = allVehicles.filter(
    (v) =>
      calculateDistance(vehicle.location, v.location) < 100 &&
      v.id !== vehicle.id
  );
  return nearbyVehicles.length / allVehicles.length;
}

function calculateCO2EmissionSaved(
  currentSpeed: number,
  idealSpeed: number,
  distance: number
): number {
  const currentEmission = 0.2 * distance * (currentSpeed / 3.6); // g/km
  const idealEmission = 0.2 * distance * (idealSpeed / 3.6); // g/km
  return Math.max(0, currentEmission - idealEmission);
}

function calculateEcoScore(
  vehicle: Vehicle,
  speedAdvice: SpeedAdvice,
  roadData: RoadData
): number {
  const speedCompliance = Math.max(
    0,
    1 - Math.abs(vehicle.currentSpeed - speedAdvice.advisorySpeed) / roadData.speedLimit
  );
  const fuelEfficiency = Math.max(
    0,
    1 - speedAdvice.estimatedFuelConsumption / (0.1 * vehicle.mass)
  );
  const accelerationScore = Math.max(
    0,
    1 - Math.abs(speedAdvice.recommendedAcceleration) / 3
  );

  return Math.min(
    100,
    (speedCompliance * 0.4 + fuelEfficiency * 0.4 + accelerationScore * 0.2) * 100
  );
}

function calculateTimeSaved(
  currentSpeed: number,
  idealSpeed: number,
  distance: number
): number {
  const currentTime = distance / Math.max(currentSpeed, 0.1); // Avoid division by zero
  const idealTime = distance / Math.max(idealSpeed, 0.1);
  return Math.max(0, currentTime - idealTime);
}

export default performCalculations;

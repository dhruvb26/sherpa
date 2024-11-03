export interface Coordinate {
  latitude: number;
  longitude: number;
}
export interface TrafficData {
  vehicles: Vehicle[];
  trafficSignals: TrafficSignal[];
  roadData: RoadData;
  environmentalData: EnvironmentalData;
}
export interface ErrorResponse {
  error: string;
}

export interface Vehicle {
  id: string;
  type: string;
  currentSpeed: number;
  location: Coordinate;
  mass: number;
  frontalArea: number;
  enginePower: number;
  drivelineEfficiency: number;
  a0: number;
  a1: number;
  a2: number;
}

export interface TrafficSignal {
  id: string;
  location: Coordinate;
  currentPhase: string;
  timeUntilNextPhase: number;
  cycleTime: number;
}

export interface RoadData {
  speedLimit: number;
  grade: number;
  upstreamDistance: number;
  downstreamDistance: number;
}

export interface EnvironmentalData {
  airDensity: number;
  gravitationalAcceleration: number;
}

export interface GLOSAOutput {
  advisorySpeed: number;
  estimatedFuelConsumption: number;
  estimatedTravelTime: number;
  estimatedArrivalTime: number;
  recommendedAcceleration: number;
}

export interface GLOSAParameters {
  alpha: number; // Weight for travel time
  beta: number; // Weight for fuel consumption
  gamma: number; // Weight for emissions
}

export interface VehicleParameters {
  mass: number;
  frontalArea: number;
  dragCoefficient: number;
  rollingResistanceCoefficient: number;
}

export const AIR_DENSITY = 1.225; // kg/m^3
export const GRAVITATIONAL_ACCELERATION = 9.81; // m/s^2

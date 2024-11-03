import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { b } from "@/baml_client";
import performCalculations from "../../../../traffic_modules/calculations";

export async function POST(request: Request) {
  const vehicleData = readFileSync(
    join(process.cwd(), "src/utils/vehicles_austin_data.md"),
    "utf-8"
  );

  const vehicleDatabase = await b.ExtractVehicleData(vehicleData);

  console.log(vehicleDatabase);

  const vehicles = vehicleDatabase.vehicles;
  const trafficSignals = vehicleDatabase.trafficSignals;
  const roadData = vehicleDatabase.roadData;
  const environmentalData = vehicleDatabase.environmentalData;

  const results = performCalculations({
    vehicles,
    trafficSignals,
    roadData,
    environmentalData,
  });

  return NextResponse.json(results);
}

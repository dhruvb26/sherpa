class Vehilce {
    id string
    type string
    currentSpeed int
    location Coordinate
    mass int
    frontalArea int
    enginePower int
    drivelineEfficiency int
    role string
}

class Coordinate {
    latitude int
    longitude int
}



class TrafficSignal {
    id string
    location Coordinate
    currentPhase string
    timeUntilNextPhase int
    cycleTime int
}

class RoadData {
    speedLimit int
    grade int
    upstreamDistance int
    downstreamDistance int
}

class EnvironmentalData {
    airDensity int
    gravitationalAcceleration int
}

class FinalResult {
    vehicles Vehilce[]
    trafficSignals TrafficSignal[]
    roadData RoadData
    environmentalData EnvironmentalData
}


function ExtractVehicleData(vehicleDatabase: string) -> FinalResult {
    client "openai/gpt-4o"
    prompt #"
Extract each vehicle's data from the following data table, look at the column headers to understand the data:
        {{ ctx.output_format }}

        Data Table:
        ------------
        {{ vehicleDatabase }}
        ------------
    "#
}

test extract_vehicle_data {
    functions [ExtractVehicleData]
    args {
        vehicleDatabase #"
            |ID       |Type |Current Speed|Location                                    |Mass|Frontal Area|Engine Power|Driveline Efficiency|Current Phase|Time Until Next Phase|Cycle Time|Speed Limit|Grade|Upstream Distance|Downstream Distance|Air Density|Gravitational Acceleration|a0  |a1  |a2  |
|---------|-----|-------------|--------------------------------------------|----|------------|------------|--------------------|-------------|---------------------|----------|-----------|-----|-----------------|-------------------|-----------|--------------------------|----|----|----|
|CAV_01  |bus  |25           |{"latitude": 30.2672, "longitude": -97.7431}|2500|3.5         |250000      |0.8                 |red          |20                   |60        |15.56      |0.05 |300              |300                |1.226      |9.806                     |0.12|0.22|0.32|
|CAV_02  |truck|30           |{"latitude": 30.2680, "longitude": -97.7435}|4000|5.0         |400000      |0.7                 |red          |25                   |70        |18.23      |0.08 |400              |400                |1.227      |9.807                     |0.14|0.24|0.34|
|CAV_03  |car  |20           |{"latitude": 30.2688, "longitude": -97.7439}|2000|2.8         |200000      |0.9                 |red          |20                   |60        |13.89      |0.03 |200              |200                |1.225      |9.806                     |0.1 |0.2 |0.3 |
|CAV_04  |bus  |25           |{"latitude": 30.2695, "longitude": -97.7443}|3000|4.2         |300000      |0.8                 |red          |25                   |70        |16.67      |0.06 |350              |350                |1.226      |9.807                     |0.13|0.23|0.33|
|CAV_05  |truck|30           |{"latitude": 30.2702, "longitude": -97.7447}|5000|6.0         |500000      |0.7                 |red          |30                   |80        |20.0       |0.1  |500              |500                |1.227      |9.808                     |0.15|0.25|0.35|
|CAV_06  |car  |20           |{"latitude": 30.2709, "longitude": -97.7451}|2500|3.0         |250000      |0.9                 |red          |20                   |60        |14.44      |0.04 |250              |250                |1.225      |9.806                     |0.11|0.21|0.31|
|CAV_07  |bus  |25           |{"latitude": 30.2716, "longitude": -97.7455}|3500|4.5         |350000      |0.8                 |red          |25                   |70        |17.14      |0.07 |400              |400                |1.226      |9.807                     |0.14|0.24|0.34|
|CAV_08  |truck|30           |{"latitude": 30.2723, "longitude": -97.7459}|6000|7.0         |600000      |0.7                 |red          |30                   |90        |21.87      |0.12 |600              |600                |1.227      |9.808                     |0.16|0.26|0.36|
|CAV_09  |car  |20           |{"latitude": 30.2730, "longitude": -97.7463}|3000|3.5         |300000      |0.9                 |red          |20                   |60        |15.56      |0.05 |300              |300                |1.225      |9.806                     |0.12|0.22|0.32|
|CAV_10  |bus  |25           |{"latitude": 30.2737, "longitude": -97.7467}|4500|5.0         |450000      |0.8                 |red          |25                   |70        |18.23      |0.08 |450              |450                |1.226      |9.807                     |0.15|0.25|0.35|

        "#
    }
}
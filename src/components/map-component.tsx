"use client";

import { useRef, useEffect, useState } from "react";
import tt, { LngLatLike, AnyLayer } from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import NumberOfCars from "@/components/blocks/number-of-cars";
import { Input } from "@/components/ui/input";
import RoadInformation from "@/components/blocks/road-information";
import VehicleChat from "./blocks/vehicle-chat";
const INITIAL_CENTER: [number, number] = [-97.7416, 30.2672];
const INITIAL_ZOOM = 16;
const TOMTOM_API_KEY = "ZsE6gacoLmSi1GtPp34Xu4aW7XaKMiZ0";
import { MapStyleSwitch } from "@/components/map-style-switch";

interface SearchResult {
  results?: Array<{
    position: {
      lat: number;
      lon: number;
    };
    address: {
      country: string;
    };
  }>;
}

interface FlowSegmentData {
  currentSpeed: number;
  freeFlowSpeed: number;
  currentTravelTime: number;
  freeFlowTravelTime: number;
  coordinates: {
    points: Array<{
      latitude: number;
      longitude: number;
    }>;
  };
}

interface TrafficResponse {
  flowSegmentData: FlowSegmentData;
}

interface TrafficInfo {
  currentSpeed: number;
  freeFlowSpeed: number;
  congestion: number;
}

function MapComponent() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapLongitude, setMapLongitude] = useState<number>(INITIAL_CENTER[0]);
  const [mapLatitude, setMapLatitude] = useState<number>(INITIAL_CENTER[1]);
  const [mapZoom, setMapZoom] = useState<number>(INITIAL_ZOOM);
  const [map, setMap] = useState<tt.Map | undefined>(undefined);
  const [zipCode, setZipCode] = useState<string>("");
  const [trafficLayer, setTrafficLayer] = useState<AnyLayer | null>(null);

  const [trafficInfo, setTrafficInfo] = useState<TrafficInfo | null>(null);
  const [showTrafficInfo, setShowTrafficInfo] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!map) return;

    const style = isDarkMode
      ? "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAS0pkdHNkUDYzbkg4aEdXYzs0NjQxNmM2MS1lOGZlLTQ2MmUtOTZmNy04NjM3ZmU5YzMwYmI=/drafts/0.json?key=mGSg2AZs2lklJ5oHDSydg7CgX2YDN8mD"
      : "";
    map.setStyle(style);
  }, [isDarkMode, map]);

  let marker: tt.Marker | undefined;
  marker = new tt.Marker({
    color: "#000",
    draggable: true,
  }).setLngLat(INITIAL_CENTER);

  // Add this function to find the most congested point
  const findMostCongestedPoint = async (
    centerLat: number,
    centerLng: number
  ) => {
    // Check multiple points around the center
    const radius = 0.01; // Roughly 1km radius
    const points = [
      { lat: centerLat, lng: centerLng },
      { lat: centerLat + radius, lng: centerLng },
      { lat: centerLat - radius, lng: centerLng },
      { lat: centerLat, lng: centerLng + radius },
      { lat: centerLat, lng: centerLng - radius },
    ];

    let maxCongestion = -1;
    let mostCongestedPoint = points[0];

    for (const point of points) {
      try {
        const response = await fetch(
          `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${point.lat},${point.lng}`
        );
        const data = (await response.json()) as TrafficResponse;

        if (data.flowSegmentData) {
          const congestion =
            (data.flowSegmentData.currentTravelTime -
              data.flowSegmentData.freeFlowTravelTime) /
            data.flowSegmentData.freeFlowTravelTime;

          if (congestion > maxCongestion) {
            maxCongestion = congestion;
            mostCongestedPoint = point;
          }
        }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    }

    return mostCongestedPoint;
  };

  useEffect(() => {
    let map: tt.Map | undefined;

    if (mapElement.current && !map) {
      map = tt.map({
        key: TOMTOM_API_KEY,
        container: mapElement.current,
        center: [mapLongitude, mapLatitude] as LngLatLike,
        zoom: mapZoom,
        pitch: 60,
        bearing: 0,
        stylesVisibility: {
          trafficFlow: true,
          trafficIncidents: true,
        },
      });

      map.on("click", async (e: { lngLat: { lat: any; lng: any; }; }) => {
        try {
          const response = await fetch(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${e.lngLat.lat},${e.lngLat.lng}`
          );
          const data = (await response.json()) as TrafficResponse;

          if (data.flowSegmentData) {
            const {
              currentSpeed,
              freeFlowSpeed,
              currentTravelTime,
              freeFlowTravelTime,
            } = data.flowSegmentData;
            const congestion =
              ((currentTravelTime - freeFlowTravelTime) / freeFlowTravelTime) *
              100;

            setTrafficInfo({
              currentSpeed,
              freeFlowSpeed,
              congestion,
            });
            setShowTrafficInfo(true);
          }
        } catch (error) {
          console.error("Error fetching traffic data:", error);
        }
      });

      map.on("load", async () => {
        map?.addLayer({
          id: "3d-buildings",
          source: "vectorTiles",
          "source-layer": "buildings",
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.6,
          },
        });

        const congestedPoint = await findMostCongestedPoint(
          INITIAL_CENTER[1],
          INITIAL_CENTER[0]
        );

        map?.setCenter([congestedPoint.lng, congestedPoint.lat]);
      });

      setMap(map);
    }

    return () => map?.remove();
  }, []);

  useEffect(() => {
    if (map) {
      map.setCenter([mapLongitude, mapLatitude] as LngLatLike);
      map.setZoom(mapZoom);
    }
  }, [map, mapLongitude, mapLatitude, mapZoom]);

  const fetchTrafficData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${lat},${lon}`
      );
      const data = (await response.json()) as TrafficResponse;

      if (data.flowSegmentData) {
        const segmentData = data.flowSegmentData;

        if (trafficLayer && map) {
          map.removeLayer(trafficLayer.id);
          map.removeSource(trafficLayer.id);
        }

        const newLayer = {
          id: "traffic-flow",
          type: "line" as const,
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {
                currentSpeed: segmentData.currentSpeed,
                freeFlowSpeed: segmentData.freeFlowSpeed,
                congestion:
                  (segmentData.currentTravelTime -
                    segmentData.freeFlowTravelTime) /
                  segmentData.freeFlowTravelTime,
              },
              geometry: {
                type: "LineString",
                coordinates: segmentData.coordinates.points.map((point) => [
                  point.longitude,
                  point.latitude,
                ]),
              },
            },
          },
          paint: {
            "line-color": [
              "interpolate",
              ["linear"],
              ["get", "congestion"],
              0,
              "#00ff00",
              0.5,
              "#ffff00",
              1,
              "#ff0000",
            ],
            "line-width": 4,
          },
        } as AnyLayer;

        if (map) {
          map.addLayer(newLayer);
          setTrafficLayer(newLayer);
        }
      }
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  const handleZipCodeSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        const searchResponse = await fetch(
          `https://api.tomtom.com/search/2/geocode/${zipCode}.json?key=${TOMTOM_API_KEY}&countrySet=USA`
        );
        const searchData = (await searchResponse.json()) as SearchResult;

        if (searchData.results && searchData.results.length > 0) {
          const result = searchData.results[0];

          if (result.address.country === "United States") {
            const { lat, lon } = result.position;
            setMapLatitude(lat);
            setMapLongitude(lon);
            setMapZoom(14);
            fetchTrafficData(lat, lon);
          } else {
            console.error("Please enter a valid US zip code");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <NumberOfCars />
        <MapStyleSwitch onToggle={setIsDarkMode} />
      </div>
      <div className="absolute top-4 right-4 z-10 mr-1">
        <Input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleZipCodeSubmit}
        />
      </div>
      <div className="absolute bottom-4 left-4 z-10">
        <RoadInformation trafficInfo={trafficInfo} />
      </div>
      <div ref={mapElement} className="w-full h-screen" />
      <div className="absolute bottom-4 right-4 z-10">
        <VehicleChat />
      </div>
    </div>
  );
}

export default MapComponent;

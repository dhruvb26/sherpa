import React from "react";

interface RoadInformationProps {
  trafficInfo: {
    currentSpeed: number;
    freeFlowSpeed: number;
    congestion: number;
  } | null;
}

const RoadInformation: React.FC<RoadInformationProps> = ({ trafficInfo }) => {
  if (!trafficInfo) return null;

  return (
    <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg space-y-2">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-2"></div>
      <span className="text-green-400 font-light uppercase font-mono text-base">
        Live
      </span>
      <p className="text-sm">
        Current Speed: {Math.round(trafficInfo.currentSpeed)} km/h
      </p>
      <p className="text-sm">
        Normal Speed: {Math.round(trafficInfo.freeFlowSpeed)} km/h
      </p>
      <p className="text-sm">
        Congestion: {Math.round(trafficInfo.congestion)}%
      </p>
    </div>
  );
};

export default RoadInformation;

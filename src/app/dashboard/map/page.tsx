"use client";
import dynamic from "next/dynamic";
import React from "react";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});
const MapPage = () => {
  return <MapComponent />;
};

export default MapPage;

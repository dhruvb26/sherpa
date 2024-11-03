import React from "react";
import { Info } from "lucide-react";

const NumberOfCars = () => {
  return (
    <div className="flex flex-col gap-2 bg-primary px-4 py-3 rounded-full w-fit">
      <h3 className="text-sm text-primary-foreground flex items-center justify-center">
        <Info className="w-4 h-4 mr-1 animate-pulse inline" />
        No. of connected cars: 3
      </h3>
    </div>
  );
};

export default NumberOfCars;

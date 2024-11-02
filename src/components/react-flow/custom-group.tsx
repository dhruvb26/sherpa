import React, { memo } from "react";
import { NodeProps } from "@xyflow/react";

type CustomGroupProps = NodeProps & {
  data: {
    label: string;
  };
  style?: React.CSSProperties;
};

function CustomGroup({ data, style }: CustomGroupProps) {
  return (
    <div className="rounded-md" style={style}>
      <div className="absolute -top-3 left-2  px-2 text-xs bg-background/80 backdrop-blur-sm rounded-md">
        {data.label}
      </div>
    </div>
  );
}

export default memo(CustomGroup);

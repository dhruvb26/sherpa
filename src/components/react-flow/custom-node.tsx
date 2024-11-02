import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

type CustomNodeProps = {
  data: {
    title: string;
    description: string;
  };
  style?: React.CSSProperties;
};

function CustomNode({ data, style }: CustomNodeProps) {
  return (
    <div
      className="px-4 py-2 shadow-md rounded-md bg-none border-[1px] border-black"
      style={style}
    >
      <div className="flex">
        <div className="ml-2 max-w-sm text-wrap">
          <h1 className="text-xs font-medium">{data.title}</h1>
          <p className="text-xs text-muted-foreground">{data.description}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 " />
      <Handle type="source" position={Position.Bottom} className="w-16 " />
    </div>
  );
}

export default memo(CustomNode);

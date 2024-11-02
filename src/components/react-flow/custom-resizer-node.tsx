import { memo } from "react";
import { Handle, Position, NodeResizeControl } from "@xyflow/react";
import { Scaling } from "lucide-react";
const controlStyle = {
  background: "transparent",
  border: "none",
};

const CustomNode = ({
  data,
  style,
}: {
  data: { label: string };
  style?: React.CSSProperties;
}) => {
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <Scaling
          size={7}
          className="text-muted-foreground"
          style={{ position: "absolute", right: 5, bottom: 5 }}
        />
      </NodeResizeControl>

      <Handle type="target" position={Position.Left} />
      <div style={style}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(CustomNode);

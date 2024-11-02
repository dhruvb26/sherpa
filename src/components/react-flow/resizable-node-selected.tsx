import { memo } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";

const ResizableNodeSelected = ({
  data,
  selected,
  style,
}: {
  data: { label: string };
  selected?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10, ...style }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNodeSelected);

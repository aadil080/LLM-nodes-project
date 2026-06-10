import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        border: "1px solid black",
        padding: "10px",
      }}
    >
      {inputs.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      <div>
        <span>{title}</span>
      </div>

      <div>{children}</div>

      {outputs.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
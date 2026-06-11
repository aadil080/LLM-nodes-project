import { Handle, Position } from "reactflow";
import { getNodeStyles } from "../../styles/nodes/nodeStyles";
import { getNodeConfig } from "../../config/nodeTypes";

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  selected = false,
  nodeType,
  style = {},
}) => {
  const nodeConfig = getNodeConfig(nodeType);
  const gradient = nodeConfig?.gradient || 'linear-gradient(135deg, #6B7280, #4B5563)';
  const icon = nodeConfig?.icon || '📦';
  
  const styles = getNodeStyles(gradient, selected);

  return (
    <div style={{ ...styles.container, ...style }}>
      {inputs.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          title={handle.label || handle.id}
          style={{
            ...styles.handle,
            ...handle.style,
            top: handle.style?.top || `${((index + 1) * 100) / (inputs.length + 1)}%`,
          }}
        />
      ))}

      <div style={styles.header}>
        <div style={styles.title}>
          <span style={styles.icon}>{icon}</span>
          <span>{title}</span>
        </div>
      </div>

      <div style={styles.body}>{children}</div>

      {outputs.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          title={handle.label || handle.id}
          style={{
            ...styles.handle,
            ...handle.style,
            top: handle.style?.top || `${((index + 1) * 100) / (outputs.length + 1)}%`,
          }}
        />
      ))}
    </div>
  );
};
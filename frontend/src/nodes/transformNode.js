import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const TransformNode = ({ id, data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || "JSON.parse");

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('transform');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when operation changes
  useEffect(() => {
    updateNodeField(id, "operation", operation);
  }, [operation, id, updateNodeField]);

  // Get display label for operation
  const getOperationLabel = () => {
    const labels = {
      'JSON.parse': 'Parse',
      'JSON.stringify': 'Stringify',
      'uppercase': 'Upper',
      'lowercase': 'Lower',
      'trim': 'Trim',
      'reverse': 'Reverse',
      'base64Encode': 'B64 Enc',
      'base64Decode': 'B64 Dec',
    };
    return labels[operation] || operation;
  };

  return (
    <BaseNode
      id={id}
      title={`Transform - ${getOperationLabel()}`}
      inputs={[{ id: "data", label: "Data" }]}
      outputs={[{ id: "result", label: "Result" }]}
      selected={selected}
      nodeType="transform"
    >
      <label style={styles.label}>
        Operation:
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
          onFocus={(e) => {
            e.target.style.border = '1px solid #3B82F6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #374151';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="JSON.parse">JSON.parse</option>
          <option value="JSON.stringify">JSON.stringify</option>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="base64Encode">Base64 Encode</option>
          <option value="base64Decode">Base64 Decode</option>
        </select>
      </label>
    </BaseNode>
  );
};

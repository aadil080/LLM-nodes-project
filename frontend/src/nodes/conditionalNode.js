import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const ConditionalNode = ({ id, data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || "==");
  const [compareTo, setCompareTo] = useState(data?.compareTo || "");

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('conditional');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when fields change
  useEffect(() => {
    updateNodeField(id, "operator", operator);
  }, [operator, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, "compareTo", compareTo);
  }, [compareTo, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title={`Condition - ${operator}`}
      inputs={[{ id: "value", label: "Value" }]}
      outputs={[
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ]}
      selected={selected}
      nodeType="conditional"
    >
      <label style={styles.label}>
        Operator:
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
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
          <option value="==">== (equals)</option>
          <option value="!=">!= (not equals)</option>
          <option value=">">&gt; (greater than)</option>
          <option value="<">&lt; (less than)</option>
          <option value=">=">&gt;= (greater or equal)</option>
          <option value="<=">&lt;= (less or equal)</option>
          <option value="contains">contains</option>
          <option value="startsWith">starts with</option>
        </select>
      </label>
      <label style={styles.label}>
        Compare to:
        <input
          type="text"
          value={compareTo}
          onChange={(e) => setCompareTo(e.target.value)}
          style={styles.input}
          placeholder="Enter comparison value"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          onFocus={(e) => {
            e.target.style.border = '1px solid #3B82F6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #374151';
            e.target.style.boxShadow = 'none';
          }}
        />
      </label>
    </BaseNode>
  );
};

import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const MergeNode = ({ id, data, selected }) => {
  const [mode, setMode] = useState(data?.mode || "concatenate");
  const [separator, setSeparator] = useState(data?.separator || " ");

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('merge');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when fields change
  useEffect(() => {
    updateNodeField(id, "mode", mode);
  }, [mode, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, "separator", separator);
  }, [separator, id, updateNodeField]);

  // Get display label for mode
  const getModeLabel = () => {
    const labels = {
      'concatenate': 'Concat',
      'joinArray': 'Array',
      'mergeObjects': 'Objects',
      'template': 'Template',
    };
    return labels[mode] || mode;
  };

  return (
    <BaseNode
      id={id}
      title={`Merge - ${getModeLabel()}`}
      inputs={[
        { id: "a", label: "A" },
        { id: "b", label: "B" },
        { id: "c", label: "C" }
      ]}
      outputs={[{ id: "merged", label: "Merged" }]}
      selected={selected}
      nodeType="merge"
    >
      <label style={styles.label}>
        Mode:
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
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
          <option value="concatenate">Concatenate</option>
          <option value="joinArray">Join Array</option>
          <option value="mergeObjects">Merge Objects</option>
          <option value="template">Template</option>
        </select>
      </label>
      {mode === "concatenate" && (
        <label style={styles.label}>
          Separator:
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            style={styles.input}
            placeholder="e.g., ' ', ',', '\n'"
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
      )}
    </BaseNode>
  );
};

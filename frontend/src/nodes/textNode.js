import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(
    data?.text || "{{input}}"
  );

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('text');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when text changes
  useEffect(() => {
    updateNodeField(id, "text", currText);
  }, [currText, id, updateNodeField]);

  // Truncate text for title display
  const getTitleText = () => {
    const maxLength = 15;
    if (currText.length > maxLength) {
      return `Text - ${currText.substring(0, maxLength)}...`;
    }
    return `Text - ${currText}`;
  };

  return (
    <BaseNode
      id={id}
      title={getTitleText()}
      outputs={[{ id: "output" }]}
      selected={selected}
      nodeType="text"
    >
      <label style={styles.label}>
        Text:
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={styles.textarea}
          placeholder="Enter text or use variables like {{input}}"
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
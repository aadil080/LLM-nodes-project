import { useState, useEffect, useRef, useMemo } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });
  const textareaRef = useRef(null);

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('text');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Extract variables from text (e.g., {{ variableName }})
  const extractedVariables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    return matches;
  }, [currText]);

  // Update store when text changes
  useEffect(() => {
    updateNodeField(id, "text", currText);
  }, [currText, id, updateNodeField]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to measure scrollHeight accurately
      textarea.style.height = 'auto';
      
      // Calculate new dimensions
      const newHeight = Math.max(60, Math.min(textarea.scrollHeight + 10, 400));
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 10);
      const newWidth = Math.max(200, Math.min(maxLineLength * 6 + 40, 500));
      
      setDimensions({ width: newWidth, height: newHeight });
      textarea.style.height = `${newHeight}px`;
    }
  }, [currText]);

  // Truncate text for title display
  const getTitleText = () => {
    const maxLength = 15;
    if (currText.length > maxLength) {
      return `Text - ${currText.substring(0, maxLength)}...`;
    }
    return `Text - ${currText}`;
  };

  // Create input handles for each variable
  const inputHandles = extractedVariables.map((varName) => ({
    id: varName,
    label: varName,
  }));

  return (
    <BaseNode
      id={id}
      title={getTitleText()}
      inputs={inputHandles}
      outputs={[{ id: "output", label: "Output" }]}
      selected={selected}
      nodeType="text"
      style={{ width: `${dimensions.width}px` }}
    >
      <label style={styles.label}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            ...styles.textarea,
            height: `${dimensions.height}px`,
            resize: 'none',
            overflow: 'auto',
          }}
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
      
      {extractedVariables.length > 0 && (
        <div style={{
          marginTop: '6px',
          padding: '4px 6px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '4px',
          fontSize: '7px',
          color: '#93C5FD',
        }}>
          <strong>Variables:</strong> {extractedVariables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
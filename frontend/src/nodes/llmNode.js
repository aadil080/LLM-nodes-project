// LLMNode.jsx

import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || "gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(data?.temperature || "0.7");
  
  const updateNodeData = usePipelineStore((state) => state.updateNodeData);
  const nodeConfig = getNodeConfig('llm');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when model or temperature changes
  useEffect(() => {
    updateNodeData(id, { model, temperature: parseFloat(temperature) });
  }, [model, temperature, id, updateNodeData]);

  return (
    <BaseNode
      id={id}
      title={`LLM - ${model}`}
      inputs={[
        {
          id: "system",
          style: { top: "33%" },
        },
        {
          id: "prompt",
          style: { top: "66%" },
        },
      ]}
      outputs={[
        {
          id: "response",
        },
      ]}
      selected={selected}
      nodeType="llm"
    >
      <label style={styles.label}>
        Model:
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={styles.select}
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
        </select>
      </label>
      
      <label style={styles.label}>
        Temperature:
        <input
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          style={styles.input}
          spellCheck={false}
        />
      </label>
    </BaseNode>
  );
};
import { useState, useEffect } from "react";
import { BaseNode } from "./Base/BaseNode";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeStyles } from "../styles/nodes/nodeStyles";
import { getNodeConfig } from "../config/nodeTypes";

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "");

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('api');
  const styles = getNodeStyles(nodeConfig?.gradient, selected);

  // Update store when fields change
  useEffect(() => {
    updateNodeField(id, "method", method);
  }, [method, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, "url", url);
  }, [url, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title={`API - ${method}`}
      inputs={[
        { id: "url", label: "URL" },
        { id: "body", label: "Body" }
      ]}
      outputs={[
        { id: "response", label: "Response" },
        { id: "status", label: "Status" }
      ]}
      selected={selected}
      nodeType="api"
    >
      <label style={styles.label}>
        Method:
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
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
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label style={styles.label}>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
          placeholder="https://api.example.com"
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

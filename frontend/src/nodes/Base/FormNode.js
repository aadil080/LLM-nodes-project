import { BaseNode } from "./BaseNode";
import { getNodeStyles } from "../../styles/nodes/nodeStyles";
import { getNodeConfig } from "../../config/nodeTypes";

export const FormNode = ({
  id,
  title,
  name,
  type,
  onNameChange,
  onTypeChange,
  inputs = [],
  outputs = [],
  selected = false,
  nodeType,
  typeOptions = [
    { value: "Text", label: "Text" },
    { value: "File", label: "File" },
  ],
}) => {
  const nodeConfig = getNodeConfig(nodeType);
  const gradient = nodeConfig?.gradient || 'linear-gradient(135deg, #6B7280, #4B5563)';
  const styles = getNodeStyles(gradient, selected);

  return (
    <BaseNode
      id={id}
      title={title}
      inputs={inputs}
      outputs={outputs}
      selected={selected}
      nodeType={nodeType}
    >
      <label style={styles.label}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          style={styles.input}
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

      <label style={styles.label}>
        Type:
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          style={styles.select}
        >
          {typeOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </BaseNode>
  );
};
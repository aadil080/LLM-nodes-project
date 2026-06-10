import { BaseNode } from "./BaseNode";

export const FormNode = ({
  id,
  title,
  name,
  type,
  onNameChange,
  onTypeChange,
  inputs = [],
  outputs = [],
  typeOptions = [
    { value: "Text", label: "Text" },
    { value: "File", label: "File" },
  ],
}) => {
  return (
    <BaseNode
      id={id}
      title={title}
      inputs={inputs}
      outputs={outputs}
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </label>

      <br />

      <label>
        Type:
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
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
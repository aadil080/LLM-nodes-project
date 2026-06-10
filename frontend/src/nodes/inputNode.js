import { useState } from "react";
import { FormNode } from "./Base/FormNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName ||
      id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  return (
    <FormNode
      id={id}
      title="Input"
      name={currName}
      type={inputType}
      onNameChange={setCurrName}
      onTypeChange={setInputType}
      outputs={[{ id: "value" }]}
      typeOptions={[
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
      ]}
    />
  );
};
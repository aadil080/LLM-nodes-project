import { useState, useEffect } from "react";
import { FormNode } from "./Base/FormNode";
import { usePipelineStore } from "../store/pipelineStore";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName ||
      id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);

  // Update store when name changes
  useEffect(() => {
    updateNodeField(id, "inputName", currName);
  }, [currName, id, updateNodeField]);

  // Update store when type changes
  useEffect(() => {
    updateNodeField(id, "inputType", inputType);
  }, [inputType, id, updateNodeField]);

  return (
    <FormNode
      id={id}
      title={`Input - ${currName}`}
      name={currName}
      type={inputType}
      onNameChange={setCurrName}
      onTypeChange={setInputType}
      outputs={[{ id: "value" }]}
      selected={selected}
      nodeType="customInput"
      typeOptions={[
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
      ]}
    />
  );
};
import { useState, useEffect } from "react";
import { FormNode } from "./Base/FormNode";
import { usePipelineStore } from "../store/pipelineStore";

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName ||
      id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);

  // Update store when name changes
  useEffect(() => {
    updateNodeField(id, "outputName", currName);
  }, [currName, id, updateNodeField]);

  // Update store when type changes
  useEffect(() => {
    updateNodeField(id, "outputType", outputType);
  }, [outputType, id, updateNodeField]);

  return (
    <FormNode
      id={id}
      title={`Output - ${currName}`}
      name={currName}
      type={outputType}
      onNameChange={setCurrName}
      onTypeChange={setOutputType}
      inputs={[{ id: "value", label: "Value" }]}
      selected={selected}
      nodeType="customOutput"
      typeOptions={[
        { value: "Text", label: "Text" },
        { value: "File", label: "Image" },
      ]}
    />
  );
};
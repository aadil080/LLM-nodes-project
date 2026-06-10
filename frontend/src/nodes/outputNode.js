import { useState } from "react";
import { FormNode } from "./Base/FormNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName ||
      id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  return (
    <FormNode
      id={id}
      title="Output"
      name={currName}
      type={outputType}
      onNameChange={setCurrName}
      onTypeChange={setOutputType}
      inputs={[{ id: "value" }]}
      typeOptions={[
        { value: "Text", label: "Text" },
        { value: "File", label: "Image" },
      ]}
    />
  );
};
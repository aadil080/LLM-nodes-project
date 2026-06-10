// LLMNode.jsx

import { BaseNode } from "./Base/BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
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
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
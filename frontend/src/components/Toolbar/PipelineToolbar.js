import { ToolbarCard } from "./ToolbarCard";
import { toolbarItems } from "./toolbarConfig";
import { toolbarStyles } from "../../styles/toolbar/toolbarStyles";

export const PipelineToolbar = () => {
  return (
    <div style={toolbarStyles.wrapper}>
      <div style={toolbarStyles.container}>
        <h3 style={toolbarStyles.title}>
          Workflow Components
        </h3>

        <div style={toolbarStyles.cardsContainer}>
          {toolbarItems.map((item) => (
            <ToolbarCard
              key={item.type}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
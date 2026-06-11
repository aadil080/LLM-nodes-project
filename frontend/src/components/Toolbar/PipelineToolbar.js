import { ToolbarCard } from "./ToolbarCard";
import { toolbarItems } from "./toolbarConfig";
import { toolbarStyles } from "../../styles/toolbar/toolbarStyles";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const PipelineToolbar = () => {
  return (
    <div style={toolbarStyles.wrapper}>
      <div style={toolbarStyles.content}>
        <h3 style={toolbarStyles.title}>
          Components
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
      
      <div style={toolbarStyles.footer}>
        <SubmitButton />
      </div>
    </div>
  );
};
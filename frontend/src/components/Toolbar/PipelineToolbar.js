import { useState, useRef, useEffect } from "react";
import { ToolbarCard } from "./ToolbarCard";
import { toolbarItems } from "./toolbarConfig";
import { getToolbarStyles } from "../../styles/toolbar/toolbarStyles";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { usePipelineStore } from "../../store/pipelineStore";

export const PipelineToolbar = () => {
  const sidebarWidth = usePipelineStore((state) => state.sidebarWidth);
  const setSidebarWidth = usePipelineStore((state) => state.setSidebarWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 180 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, setSidebarWidth]);

  const toolbarStyles = getToolbarStyles(sidebarWidth);

  return (
    <div ref={sidebarRef} style={toolbarStyles.wrapper}>
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

      <div
        style={{
          ...toolbarStyles.resizeHandle,
          ...(isHovering && !isResizing && toolbarStyles.resizeHandleHover),
          ...(isResizing && {
            background: 'rgba(59, 130, 246, 0.5)',
            borderRight: '2px solid #3B82F6',
          }),
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    </div>
  );
};
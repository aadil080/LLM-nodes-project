export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeConfig = {
    customInput: {
      icon: "📥",
      color: "#10B981",
    },
    llm: {
      icon: "🤖",
      color: "#8B5CF6",
    },
    customOutput: {
      icon: "📤",
      color: "#F59E0B",
    },
    text: {
      icon: "📝",
      color: "#3B82F6",
    },
  };

  const config = nodeConfig[type];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => (e.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        width: "140px",
        height: "90px",
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: `${config.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        {config.icon}
      </div>

      <span
        style={{
          fontWeight: 600,
          color: "#111827",
          fontSize: "14px",
        }}
      >
        {label}
      </span>
    </div>
  );
};
export const getToolbarStyles = (width = 220) => ({
  wrapper: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: `${width}px`,
    background: "#111827",
    borderRight: "1px solid #374151",
    boxShadow: "4px 0 20px rgba(0,0,0,.3)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 8px",
  },

  footer: {
    padding: "12px 8px",
    borderTop: "1px solid #374151",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    color: "#F9FAFB",
    marginBottom: "12px",
    fontSize: "15px",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: "10px",
    borderBottom: "1px solid #374151",
  },

  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },

  resizeHandle: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "6px",
    height: "100%",
    cursor: "ew-resize",
    background: "transparent",
    transition: "all 0.2s ease",
    zIndex: 10,
    borderRight: "2px solid transparent",
  },
  
  resizeHandleHover: {
    background: "rgba(59, 130, 246, 0.3)",
    borderRight: "2px solid rgba(59, 130, 246, 0.6)",
  },
});

// Keep legacy export for backwards compatibility
export const toolbarStyles = getToolbarStyles(220);
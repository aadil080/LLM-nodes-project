export const toolbarStyles = {
  wrapper: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: "180px",
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
    padding: "20px 10px",
  },

  footer: {
    padding: "16px 10px",
    borderTop: "1px solid #374151",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  title: {
    color: "#F9FAFB",
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid #374151",
  },

  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};
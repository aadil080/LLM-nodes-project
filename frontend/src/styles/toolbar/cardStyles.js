export const getCardStyles = (gradient) => ({
  container: {
    width: "100%",
    height: "100px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#1F2937",
    border: "1px solid #374151",
    cursor: "grab",
    transition: "all .2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,.25)",
  },

  header: {
    height: "55px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },

  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45px",
  },

  label: {
    color: "#F9FAFB",
    fontWeight: 600,
    fontSize: "13px",
  },
});

export const cardHoverStyles = {
  transform: "translateX(4px)",
  boxShadow: "0 8px 20px rgba(0,0,0,.35)",
};

export const cardDefaultShadow =
  "0 4px 12px rgba(0,0,0,.25)";
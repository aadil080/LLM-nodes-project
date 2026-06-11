export const getCardStyles = (gradient) => ({
  container: {
    width: "90px",
    height: "75px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#1F2937",
    border: "1px solid #374151",
    cursor: "grab",
    transition: "all .2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,.25)",
    flexShrink: 0,
  },

  header: {
    height: "45px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
  },

  label: {
    color: "#F9FAFB",
    fontWeight: 600,
    fontSize: "10px",
  },
});

export const cardHoverStyles = {
  transform: "scale(1.05)",
  boxShadow: "0 4px 16px rgba(0,0,0,.35)",
};

export const cardDefaultShadow = "0 2px 8px rgba(0,0,0,.25)";
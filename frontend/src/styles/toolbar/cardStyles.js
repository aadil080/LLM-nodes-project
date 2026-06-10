export const getCardStyles = (gradient) => ({
  container: {
    width: "150px",
    height: "110px",
    borderRadius: "18px",
    overflow: "hidden",
    background: "#1F2937",
    border: "1px solid #374151",
    cursor: "grab",
    transition: "all .25s ease",
    boxShadow: "0 8px 20px rgba(0,0,0,.25)",
  },

  header: {
    height: "50px",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
  },

  label: {
    color: "#F9FAFB",
    fontWeight: 600,
    fontSize: "15px",
  },
});

export const cardHoverStyles = {
  transform: "translateY(-6px)",
  boxShadow: "0 18px 40px rgba(0,0,0,.35)",
};

export const cardDefaultShadow =
  "0 8px 20px rgba(0,0,0,.25)";
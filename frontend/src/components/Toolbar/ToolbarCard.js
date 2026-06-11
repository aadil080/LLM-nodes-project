import {
  getCardStyles,
  cardHoverStyles,
  cardDefaultShadow,
} from "../../styles/toolbar/cardStyles";

export const ToolbarCard = ({
  type,
  label,
  icon,
  gradient,
}) => {
  const styles = getCardStyles(gradient);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType })
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      style={styles.container}
      onDragStart={(e) => onDragStart(e, type)}
      onMouseEnter={(e) => {
        Object.assign(
          e.currentTarget.style,
          cardHoverStyles
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateX(0)";
        e.currentTarget.style.boxShadow =
          cardDefaultShadow;
      }}
    >
      <div style={styles.header}>{icon}</div>

      <div style={styles.body}>
        <span style={styles.label}>{label}</span>
      </div>
    </div>
  );
};
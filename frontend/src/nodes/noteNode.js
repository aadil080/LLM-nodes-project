import { useState, useEffect } from "react";
import { usePipelineStore } from "../store/pipelineStore";
import { getNodeConfig } from "../config/nodeTypes";

export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || "");
  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const nodeConfig = getNodeConfig('note');

  // Update store when note changes
  useEffect(() => {
    updateNodeField(id, "note", note);
  }, [note, id, updateNodeField]);

  // Note node has custom styling - sticky note appearance
  const noteStyles = {
    container: {
      minWidth: '150px',
      minHeight: '120px',
      borderRadius: '4px',
      background: '#FEF3C7',
      border: selected ? '2px solid #F59E0B' : '1px solid #FDE68A',
      boxShadow: selected 
        ? '0 5px 12px rgba(245,158,11,0.3)' 
        : '0 3px 8px rgba(0,0,0,0.15)',
      padding: '12px',
      transition: 'all 0.2s ease',
    },
    textarea: {
      width: '100%',
      minHeight: '80px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #FDE68A',
      background: '#FFFBEB',
      color: '#78350F',
      fontSize: '10px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.2s ease',
      lineHeight: '1.5',
    },
    header: {
      fontSize: '9px',
      fontWeight: 600,
      color: '#92400E',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    icon: {
      fontSize: '12px',
    },
  };

  return (
    <div style={noteStyles.container}>
      <div style={noteStyles.header}>
        <span style={noteStyles.icon}>{nodeConfig?.icon || '📌'}</span>
        Note
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={noteStyles.textarea}
        placeholder="Add notes, reminders, or documentation here..."
        spellCheck={true}
        onFocus={(e) => {
          e.target.style.border = '1px solid #F59E0B';
          e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid #FDE68A';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

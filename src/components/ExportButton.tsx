import React from 'react';

const ExportButton: React.FC<{ onExport: () => void; disabled: boolean }> = ({ onExport, disabled }) => {
  return (
    <button
      onClick={onExport}
      className={`btn-primary primary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      Download CSV-Datei
    </button>
  );
};

export default ExportButton;
import React, { useRef } from "react";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function SelectBPM({ beatsPerMin, handleBPMChange, playing }) {
  const renderError = () => {
    if (beatsPerMin < 60 || beatsPerMin > 300) {
      return <p className="bpm-error">BPM needs to be between 60 - 300 BPM</p>;
    }
  };
  return (
    <div>
      <label>BPM:</label>
      <input
        type="number"
        value={beatsPerMin}
        onChange={handleBPMChange}
        disabled={playing ? "disabled" : ""}
      />
      {renderError()}
    </div>
  );
}

export default SelectBPM;

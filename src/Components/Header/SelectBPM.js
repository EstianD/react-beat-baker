import React, { useRef } from "react";

import { Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";

import "react-dropdown/style.css";

function SelectBPM({ beatsPerMin, handleBPMChange, playing }) {
  const renderError = () => {
    if (beatsPerMin < 60 || beatsPerMin > 1000) {
      return <p className="bpm-error">BPM needs to be between 60 - 1000 BPM</p>;
    }
  };
  return (
    <div>
      <div className="select-container">
        <div className="bpm-title">BPM:</div>
        <div className="bpm-input-container">
          <input
            className="bpm-input"
            type="number"
            value={beatsPerMin}
            onChange={handleBPMChange}
            disabled={playing ? "disabled" : ""}
          />
        </div>
      </div>

      {renderError()}
    </div>
  );
}

export default SelectBPM;

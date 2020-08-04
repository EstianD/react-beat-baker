import React, { useRef } from "react";

import { Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";

import "react-dropdown/style.css";

function SelectBPM({ beatsPerMin, handleBPMChange, playing }) {
  const renderError = () => {
    if (beatsPerMin < 60 || beatsPerMin > 300) {
      return <p className="bpm-error">BPM needs to be between 60 - 300 BPM</p>;
    }
  };
  return (
    <div>
      <Row className="">
        <Col xs={2}>
          <p>BPM:</p>
        </Col>
        <Col xs={10}>
          <Form.Group controlId="BPMSelector">
            <Form.Control
              className="bpm-container"
              type="number"
              value={beatsPerMin}
              onChange={handleBPMChange}
              disabled={playing ? "disabled" : ""}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* <label>BPM:</label>
      <br />
      <input
        type="number"
        value={beatsPerMin}
        onChange={handleBPMChange}
        disabled={playing ? "disabled" : ""}
      /> */}
      {renderError()}
    </div>
  );
}

export default SelectBPM;

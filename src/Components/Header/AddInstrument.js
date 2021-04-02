import React from "react";

import { Button } from "react-bootstrap";

function AddInstrument({ handleInstrumentAdd }) {
  return (
    <div>
      <br />
      <button
        className="btn_instrument-add"
        onClick={(e) => handleInstrumentAdd(e)}
      >
        Add
      </button>
    </div>
  );
}

export default AddInstrument;

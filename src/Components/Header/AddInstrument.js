import React from "react";

import { Button } from "react-bootstrap";

function AddInstrument({ handleInstrumentAdd }) {
  return (
    <div>
      <Button
        className="btn_instrument-add"
        variant="primary"
        onClick={(e) => handleInstrumentAdd(e)}
      >
        Add
      </Button>{" "}
    </div>
  );
}

export default AddInstrument;

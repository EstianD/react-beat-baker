import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// Import instrument data
import instrumentData from "../../instrumentData.json";

function SelectInstrument({
  instrumentData,
  handleInstrumentChange,
  selectedInstrument,
  setInstruments,
  instruments,
  instrumentInput,
  setInstrumentInput,
}) {
  return (
    <div>
      <label>Instruments:</label>
      <Dropdown
        options={instruments}
        onChange={(e) => setInstrumentInput(e.value)}
        value={instrumentInput}
        placeholder="Select an option"
      />
    </div>
  );
}

export default SelectInstrument;

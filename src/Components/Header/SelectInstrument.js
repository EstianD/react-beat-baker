import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function SelectInstrument({
  instrumentData,
  handleInstrumentChange,
  selectedInstrument,
  setInstruments,
  instruments,
}) {
  return (
    <div>
      <label>Instruments:</label>
      <Dropdown
        options={instruments}
        onChange={(e) => handleInstrumentChange(e)}
        value={selectedInstrument}
        placeholder="Select an option"
      />
    </div>
  );
}

export default SelectInstrument;

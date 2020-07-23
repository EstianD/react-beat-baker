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
  //   console.log(instrumentData);

  return (
    <div>
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

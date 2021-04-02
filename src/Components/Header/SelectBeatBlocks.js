import React from "react";
import Dropdown from "react-dropdown";

function SelectBeatBlocks({
  beatBlocks,
  handleBeatBlockChange,
  beatBlockOptions,
  state,
}) {
  let selectedIndex = parseInt(beatBlockOptions.indexOf(beatBlocks.toString()));
  let stateExist = Object.keys(state).length !== 0;

  return (
    <div className="select-beat-blocks">
      <label>Beat Blocks:</label>
      <Dropdown
        options={beatBlockOptions}
        onChange={(e) => handleBeatBlockChange(e)}
        value={beatBlockOptions[selectedIndex]}
        disabled={stateExist ? "disabled" : ""}
      />
    </div>
  );
}

export default SelectBeatBlocks;

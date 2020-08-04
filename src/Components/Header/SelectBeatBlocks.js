import React from "react";
import Dropdown from "react-dropdown";

function SelectBeatBlocks({
  playing,
  beatBlocks,
  handleBeatBlockChange,
  beatBlockOptions,
  state,
}) {
  console.log("BEATBLOCKS: ", beatBlocks);
  console.log("STATE: ", state);

  let selectedIndex = parseInt(beatBlockOptions.indexOf(beatBlocks.toString()));
  let stateExist = Object.keys(state).length !== 0;
  console.log(state);

  //   const selectBeatBlockHandle = () => {
  //     console.log(parseInt(beatBlockOptions.indexOf(beatBlocks.toString())));
  //   };
  return (
    <div>
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

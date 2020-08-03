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

  let selectedIndex = parseInt(beatBlockOptions.indexOf(beatBlocks.toString()));
  console.log(state);

  //   const selectBeatBlockHandle = () => {
  //     console.log(parseInt(beatBlockOptions.indexOf(beatBlocks.toString())));
  //   };
  return (
    <div>
      {/* <label>Beat Blocks:</label> */}
      <Dropdown
        options={beatBlockOptions}
        onChange={(e) => handleBeatBlockChange(e)}
        value={beatBlockOptions[selectedIndex]}
        disabled={state ? "disabled" : ""}
      />
    </div>
  );
}

export default SelectBeatBlocks;

import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function InstrumentLayer({ beatBlocks, state, handleUpdateTrack }) {
  const classes = useStyles();

  let stateExist = Object.keys(state).length !== 0;
  // console.log("BEGIN:", state);

  const data = {
    kit_name: "Acoustic",
    instrument_layers: 6,
    sound_notes: Array(beatBlocks).fill(0),
    sounds: ["closehat", "flam", "kick", "revhat", "snare", "tom"],
  };

  let instrumentId = "";

  // if (state[0]) {
  //   let sound = state[0].sounds[1];
  //   console.log(sound);
  //   console.log("this: ", state[0].layers);
  // }

  // console.log(data);
  // On cell enter
  const onCellEnterHandler = (e) => {
    // console.log(e.target);
    if (e.target.className !== "active") {
      e.target.className = "instrument-hover";
    }
  };
  // On cell exit
  const onCellLeaveHandler = (e) => {
    if (e.target.className !== "active") {
      e.target.className = "";
    }
  };

  // On cell click
  const onCellClickHandler = (e) => {
    console.log(e.target);
    let index;
    let sound;

    let indexArr = e.target.id.split("-");

    sound = indexArr[0];
    index = parseInt(indexArr[1]);

    handleUpdateTrack(index, sound);

    console.log("INDEX ARR: ", indexArr);
    if (e.target.className !== "active") {
      e.target.className = "active";
    } else {
      e.target.className = "";
    }
  };

  const renderInstrumentTables = () => {
    const headerArray = [];
    // Loop through timing blocks
    headerArray.push(<th></th>);
    for (let block = 1; block <= beatBlocks; block++) {
      headerArray.push(<th className="beat-block-header">{block}</th>);
    }

    // Check if State is not empty, then render track
    if (stateExist) {
      // console.log(state);
      return (
        <div>
          <Table responsive>
            <thead>
              <tr>{headerArray}</tr>
            </thead>
            <tbody>
              {/* {console.log("Conponent: ", state)} */}
              {state[0].sounds.map((sound) => {
                {
                  /* console.log("SOUND"); */
                }
                return (
                  <tr width="100%">
                    <td>{sound}</td>
                    {state[0].layers[sound].map((i, index) => {
                      instrumentId = `${sound}-${index}`;
                      {
                        /* console.log("BEAT: ", index); */
                      }
                      return (
                        <td
                          id={instrumentId}
                          onMouseEnter={(e) => onCellEnterHandler(e)}
                          onMouseLeave={(e) => onCellLeaveHandler(e)}
                          onClick={(e) => onCellClickHandler(e)}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <p className="text-center">(Please select a instrument)</p>;
    }
  };

  return (
    <div>
      {/* {console.log(state)} */}
      {renderInstrumentTables()}
    </div>
  );
}

export default InstrumentLayer;

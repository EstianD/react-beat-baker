import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "use-measure";

import { makeStyles } from "@material-ui/core/styles";

import { AiOutlineSound } from "react-icons/ai";

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Button,
} from "react-bootstrap";

// Import components
import Note from "./Note";
import SaveTrackButton from "./SaveTrackButton";
import CloseTrackButton from "./CloseTrackButton";

// Import save/delete images
import deleteTrackImage from "../../Images/button_delete.png";
import saveTrackImage from "../../Images/button_saveV2.svg";

function InstrumentLayer({
  beatBlocks,
  state,
  handleAddTrack,
  handleRemoveTrack,
  playing,
  handleSaveTrack,
  handleCloseTrack,
  handleSaveChange,
  saveInputError,
  handleSoundIcon,
}) {
  let stateExist = Object.keys(state).length !== 0;

  let instrumentId = "";

  // On cell enter
  const onCellEnterHandler = (e) => {
    // Set classname of hovered cell
    if (e.target.className !== "active") {
      e.target.classList.add("instrument-hover");
    }
  };
  // On cell exit
  const onCellLeaveHandler = (e) => {
    if (e.target.className !== "active") {
      e.target.classList.remove("instrument-hover");
    }
  };

  // On cell click
  const onCellClickHandler = (e) => {
    let index;
    let sound;
    let indexArr;

    indexArr = e.target.id.split("-");
    sound = indexArr[0];
    index = parseInt(indexArr[1]);

    // Set classname of active class
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");

      handleRemoveTrack(index, sound);
    } else {
      e.target.classList.add("active");

      handleAddTrack(index, sound);
    }
  };

  // Render Instrument grid function ------------------------------------------------------------
  const renderInstrumentGrid = () => {
    const headerArray = [];
    // Loop through timing blocks
    // headerArray.push(<th></th>);
    // headerArray.push(<animate.div style={styleProps}>);PUSH ANIMATE DIV TO INDEX[1] AND CLOSE DIV AT LAST INDEX

    console.log(state);

    // Check if State is not empty, then render track
    if (stateExist) {
      for (let block = 1; block <= state.beatblocks; block++) {
        headerArray.push(
          <div className="header-cell" id={`beatblock-${block}`}>
            {block}
          </div>
        );
      }
      return (
        <div>
          <div className="track-header">
            <div className="track-config">
              <SaveTrackButton
                handleSaveTrack={handleSaveTrack}
                handleSaveChange={handleSaveChange}
                saveInputError={saveInputError}
              />
              <CloseTrackButton handleCloseTrack={handleCloseTrack} />
            </div>

            <div className="time-header">{headerArray}</div>
          </div>

          {state.sounds.map((sound) => {
            return (
              <div className="track-row">
                <div className="sound-block" id={sound}>
                  <span className="instrument-title">{sound}</span>
                  &nbsp;
                  <AiOutlineSound
                    className="sound-icon"
                    onClick={(sound) => handleSoundIcon(sound)}
                    id={sound}
                  />
                </div>
                {state.layers[sound].map((i, index) => {
                  instrumentId = `${sound}-${index}`;

                  return (
                    <Note
                      instrumentId={instrumentId}
                      onCellEnterHandler={onCellEnterHandler}
                      onCellLeaveHandler={onCellLeaveHandler}
                      onCellClickHandler={onCellClickHandler}
                      cellValue={i}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <p className="text-center no-instrument">
          (Please select a instrument to add)
        </p>
      );
    }
  };

  // ---------------------------------------

  return <div>{renderInstrumentGrid()}</div>;
}

export default InstrumentLayer;

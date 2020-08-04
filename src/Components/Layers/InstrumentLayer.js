import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "use-measure";

import { makeStyles } from "@material-ui/core/styles";

import Table from "react-bootstrap/Table";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Button,
} from "react-bootstrap";

import Note from "./Note";
import SaveTrackButton from "./SaveTrackButton";

// Import save/delete images
import deleteTrackImage from "../../Images/button_delete.png";
import saveTrackImage from "../../Images/button_saveV2.svg";

function InstrumentLayer({
  beatBlocks,
  state,
  handleAddTrack,
  handleRemoveTrack,
  styleProps,
  playing,
  handleSaveTrack,
  handleDeleteTrack,
  handleSaveChange,
  saveInputError,
}) {
  let stateExist = Object.keys(state).length !== 0;

  const data = {
    kit_name: "Acoustic",
    instrument_layers: 6,
    sound_notes: Array(beatBlocks).fill(0),
    sounds: ["closehat", "flam", "kick", "revhat", "snare", "tom"],
  };

  let instrumentId = "";

  // On cell enter
  const onCellEnterHandler = (e) => {
    console.log(e.target);
    console.log(e.target.parentNode);
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
    console.log(e.target);
    let index;
    let sound;
    let indexArr;

    indexArr = e.target.id.split("-");
    sound = indexArr[0];
    index = parseInt(indexArr[1]);

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

    for (let block = 1; block <= beatBlocks; block++) {
      headerArray.push(
        <Col className="headerCell" id={`beatblock-${block}`}>
          {block}
        </Col>
      );
    }

    // Check if State is not empty, then render track
    if (stateExist) {
      return (
        <div>
          <Row className="trackHeader">
            <Col className="track-config" xs={2}>
              <SaveTrackButton
                handleSaveTrack={handleSaveTrack}
                handleSaveChange={handleSaveChange}
                saveInputError={saveInputError}
              />
              <Button
                className="track-config-btn"
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteTrack()}
              >
                Delete
              </Button>
            </Col>

            {/* Loop through header columns */}
            <Col xs={10}>
              <Row className="timeHeader">{headerArray}</Row>
            </Col>
          </Row>

          {state.sounds.map((sound) => {
            return (
              <Row className="trackRow">
                <Col xs={2} id={sound}>
                  {sound}
                </Col>
                {state.layers[sound].map((i, index) => {
                  instrumentId = `${sound}-${index}`;

                  return (
                    <Note
                      instrumentId={instrumentId}
                      onCellEnterHandler={onCellEnterHandler}
                      onCellLeaveHandler={onCellLeaveHandler}
                      onCellClickHandler={onCellClickHandler}
                    />
                  );
                })}
              </Row>
            );
          })}
        </div>
      );
    } else {
      return <p className="text-center">(Please select a instrument to add)</p>;
    }
  };

  // ---------------------------------------

  return <div>{renderInstrumentGrid()}</div>;
}

export default InstrumentLayer;

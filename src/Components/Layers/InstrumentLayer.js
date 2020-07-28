import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "use-measure";

import { makeStyles } from "@material-ui/core/styles";

import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function InstrumentLayer({
  beatBlocks,
  state,
  handleUpdateTrack,
  styleProps,
  playing,
}) {
  const classes = useStyles();

  const props = useSpring({
    width: playing ? 100 : 0,
    backgroundColor: playing ? "blue" : "red",
    config: { duration: 3000 },
  });

  // console.log(props);

  //

  let stateExist = Object.keys(state).length !== 0;
  // console.log("BEGIN:", state);

  const data = {
    kit_name: "Acoustic",
    instrument_layers: 6,
    sound_notes: Array(beatBlocks).fill(0),
    sounds: ["closehat", "flam", "kick", "revhat", "snare", "tom"],
  };

  let instrumentId = "";

  // console.log(data);
  // On cell enter
  const onCellEnterHandler = (e) => {
    console.log(e.target);
    console.log(e.target.parentNode);
    if (e.target.className !== "active") {
      e.target.classList.add("instrument-hover");
      // e.target.classList.add("instrument-hover");

      // e.target.className = "instrument-hover";
    }
  };
  // On cell exit
  const onCellLeaveHandler = (e) => {
    if (e.target.className !== "active") {
      // e.target.className = "";
      e.target.classList.remove("instrument-hover");
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
    if (e.target.classList.contains("active")) {
      // console.log("ADD");

      // e.target.className = "active";
      e.target.classList.remove("active");

      // console.log(e.target.classList);
    } else {
      // console.log("REMOVE");
      // e.target.className = "";
      e.target.classList.add("active");
    }
  };

  // const renderInstrumentTables = () => {
  //   const headerArray = [];
  //   // Loop through timing blocks
  //   // headerArray.push(<th></th>);
  //   // headerArray.push(<animate.div style={styleProps}>);PUSH ANIMATE DIV TO INDEX[1] AND CLOSE DIV AT LAST INDEX
  //   for (let block = 1; block <= beatBlocks; block++) {
  //     headerArray.push(<th className="beat-block-header">{block}</th>);
  //   }

  //   // Check if State is not empty, then render track
  //   if (stateExist) {
  //     // console.log(state);
  //     return (
  //       <div>
  //         <Table responsive>
  //           <thead>
  //             <tr>
  //               <th></th>
  //               {headerArray}
  //             </tr>
  //             {}
  //           </thead>
  //           <tbody>
  //             {/* {console.log("Conponent: ", state)} */}
  //             {state[0].sounds.map((sound) => {
  //               return (
  //                 <tr width="100%">
  //                   <td>{sound}</td>
  //                   {state[0].layers[sound].map((i, index) => {
  //                     instrumentId = `${sound}-${index}`;

  //                     return (
  //                       <td
  //                         id={instrumentId}
  //                         onMouseEnter={(e) => onCellEnterHandler(e)}
  //                         onMouseLeave={(e) => onCellLeaveHandler(e)}
  //                         onClick={(e) => onCellClickHandler(e)}
  //                       ></td>
  //                     );
  //                   })}
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </Table>
  //       </div>
  //     );
  //   } else {
  //     return <p className="text-center">(Please select a instrument)</p>;
  //   }
  // };

  // Render Instrument grid function ------------------------------------------------------------

  const renderInstrumentGrid = () => {
    const headerArray = [];
    // Loop through timing blocks
    // headerArray.push(<th></th>);
    // headerArray.push(<animate.div style={styleProps}>);PUSH ANIMATE DIV TO INDEX[1] AND CLOSE DIV AT LAST INDEX

    for (let block = 1; block <= beatBlocks; block++) {
      headerArray.push(
        <Col className="headerCell" id={block}>
          {block}
        </Col>
      );
    }

    // Check if State is not empty, then render track
    if (stateExist) {
      // console.log(state);
      return (
        <div>
          <Row>
            <Col xs={2}></Col>
            <Col xs={10} className="timing-bar">
              <animated.div xs={12} className="timing-bar" style={styleProps}>
                &nbsp;
              </animated.div>
            </Col>
          </Row>
          <Row className="trackHeader">
            <Col xs={2}></Col>

            {/* Loop through header columns */}
            <Col xs={10}>
              <Row className="timeHeader">{headerArray}</Row>
            </Col>
          </Row>

          {state[0].sounds.map((sound) => {
            return (
              <Row className="trackRow">
                <Col xs={2} id={sound}>
                  {sound}
                </Col>
                {state[0].layers[sound].map((i, index) => {
                  instrumentId = `${sound}-${index}`;

                  return (
                    <Col
                      className="trackCell"
                      id={instrumentId}
                      onMouseEnter={(e) => onCellEnterHandler(e)}
                      onMouseLeave={(e) => onCellLeaveHandler(e)}
                      onClick={(e) => onCellClickHandler(e)}
                    >
                      {/* <div
                        id={instrumentId}
                        onMouseEnter={(e) => onCellEnterHandler(e)}
                        onMouseLeave={(e) => onCellLeaveHandler(e)}
                        onClick={(e) => onCellClickHandler(e)}
                      >
                        <span></span>
                      </div> */}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      );
    } else {
      return <p className="text-center">(Please select a instrument)</p>;
    }
  };

  // ---------------------------------------

  return (
    <div>
      {/* {console.log(state)} */}

      {renderInstrumentGrid()}
    </div>
  );
}

export default InstrumentLayer;

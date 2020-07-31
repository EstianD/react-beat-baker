import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useSound from "use-sound";
import "./App.css";
import instrumentData from "./instrumentData.json";

// Import useInterval Hook

import { Container, Row, Col } from "react-bootstrap";

// Components
import InstrumentLayer from "./Components/Layers/InstrumentLayer";
import SelectInstrument from "./Components/Header/SelectInstrument";
import AddInstrument from "./Components/Header/AddInstrument";
import PlayButton from "./Components/Header/PlayButton";
import StopButton from "./Components/Header/StopButton";
import SelectBPM from "./Components/Header/SelectBPM";

import acousticSound from "../src/Sounds/Acoustic/acoustic_full.mp3";

function App() {
  // const beatBlocks = 8;

  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setselectedInstrument] = useState("");
  const [state, setState] = useState({});
  const [playing, setPlaying] = useState(false);
  const [instrumentInput, setInstrumentInput] = useState("");

  const [beatBlocks, setBeatBlocks] = useState(16);
  const [beatsPerMin, setBeatsPerMinute] = useState(100);

  // State to manage spring style for timer
  const [timerStyle, setTimerStyle] = useState({});

  const [styleState] = useState(timerStyle);

  // For spring
  const [toggle, setToggle] = useState(true);

  let playTrackLoop;
  let testLoop;
  const BPMms = 60000;
  let playingNote;

  // Spring example
  const styleProps = useSpring(timerStyle);

  const [acoustic, stopAcoustic] = useSound(acousticSound, {
    sprite: {
      closehat: [0, 300],
      kick: [300, 250],
      snare: [550, 250],
      tom: [800, 900],
      flam: [1700, 300],
    },
    interupt: false,
  });

  // UseEffect on Load
  useEffect(() => {
    // Temp Array for instruments before changing state
    let instrumentArr = [];

    // Set state for instrument dropdown
    instrumentData.map((i) => {
      instrumentArr.push(i.kit_name);
    });
    setInstruments(instrumentArr);
  }, []);

  // UseEffect on state change of 'playing'
  useEffect(() => {
    console.log(
      "------------------------------------------------------------------------------------"
    );
    let loop = 0;
    let indexSound;
    let noteObj = {};
    let timeElement;

    playTrackLoop = null;

    if (playing) {
      playTrackLoop = setInterval(() => {
        // for (let block = 1; block <= beatBlocks; block++) {
        //   // console.log(block);
        //   timeElement = document.getElementById(`beatblock-${block}`);
        //   if (timeElement) {
        //     console.log(timeElement);
        //     timeElement.classList.remove("played-time");
        //   }
        // }

        noteObj = {};
        if (loop < beatBlocks) {
          // console.log("LOOP1: ", loop);
          if (loop == 0) {
            for (let block = 1; block <= beatBlocks; block++) {
              // console.log(block);
              timeElement = document.getElementById(`beatblock-${block}`);
              if (timeElement) {
                console.log(timeElement);
                timeElement.classList.remove("played-time");
              }
            }
          }

          state[0].sounds.map((sound) => {
            indexSound = state[0].layers[sound][loop];
            // console.log("SOUND: ", sound);
            console.log("LOOP2: ", loop);

            if (indexSound) {
              noteObj = {
                id: indexSound,
              };

              // ADD PLAYING NOTe
              // document.getElementById();
              acoustic(noteObj);
            }
            document
              .getElementById(`beatblock-${loop + 1}`)
              .classList.add("played-time");
          });
        }

        // else {
        //   loop = 0;
        //   state[0].sounds.map((sound) => {
        //     indexSound = state[0].layers[sound][loop];
        //     // console.log(indexSound);
        //   });
        //   console.log("HIERSO");
        // setTimerStyle({
        //   from: { width: "100%", backgroundColor: "blue" }, //HIERRRRRRRRRRRRRRRRRRRRRRRRRR
        //   to: { width: "0%", backgroundColor: "blue" },
        //   config: { duration: 0 },
        // });
        // }

        loop++;

        // console.log("LOOP3: ", loop);
        // console.log("BEAT: ", beatBlocks);

        if (loop === beatBlocks) {
          console.log("DIt is hier");

          // for (let block = 1; block <= beatBlocks; block++) {
          //   // console.log(block);
          //   timeElement = document.getElementById(`beatblock-${block}`);
          //   if (timeElement) {
          //     console.log(timeElement);
          //     timeElement.classList.remove("played-time");
          //   }
          // }

          loop = 0;
        }
        // loop++;
      }, BPMms / beatsPerMin);
    }
    return () => {
      clearInterval(playTrackLoop);
      setTimerStyle({});
    };
    // stop();
  }, [playing]);

  // Start to play track
  // function play() {
  //   let loop = 0;
  //   let indexSound;
  //   let noteObj = {};

  //   if (playing) {
  //     playTrackLoop = setInterval(() => {
  //       // Loop through sounds
  //       console.log("played");
  //       noteObj = {};
  //       if (loop < beatBlocks) {
  //         state[0].sounds.map((sound) => {
  //           indexSound = state[0].layers[sound][loop];
  //           if (indexSound) {
  //             noteObj = {
  //               id: indexSound,
  //             };
  //             // console.log(noteObj);
  //             acoustic(noteObj);
  //           }
  //         });
  //         // console.log(loop);
  //       } else {
  //         loop = 0;
  //         state[0].sounds.map((sound) => {
  //           indexSound = state[0].layers[sound][loop];
  //           console.log(indexSound);
  //         });
  //         // console.log(loop);
  //       }

  //       loop++;
  //       if (loop === beatBlocks - 1) {
  //         setBeatBlocks(0);
  //       }

  //       if (!playing) {
  //         // clearInterval(playTrackLoop);
  //       }
  //     }, BPMms / beatsPerMin);
  //   }

  //   return () => clearInterval(playTrackLoop);

  //   console.log(playTrackLoop);
  // }

  // Stop playing
  const stop = () => {
    clearInterval(playTrackLoop);
  };

  const handleInstrumentChange = (e) => {
    // setselectedInstrument(e.value);
    setInstrumentInput(e.value);
  };

  const handleInstrumentAdd = () => {
    setselectedInstrument(instrumentInput);
    // console.log(selectedInstrument);
    const instrumentConfig = instrumentData.filter((name) => {
      // console.log(name.kit_name);
      return name.kit_name.includes(selectedInstrument);
      // name.kit_name.includes(selectedInstrument);
    });

    if (instrumentConfig !== 0) {
      // console.log("IF: ", instrumentConfig[0].sounds);
      instrumentConfig[0].sounds.map((sound) => {
        instrumentConfig[0].layers[sound] = Array(beatBlocks).fill(0);
      });
    }

    setState(instrumentConfig);
  };

  // Handler for updating state after track is clicked
  const handleAddTrack = (index, sound) => {
    setState(state, (state[0].layers[sound][index] = sound));
  };

  const handleRemoveTrack = (index, sound) => {
    setState(state, (state[0].layers[sound][index] = 0));
  };

  const handleBPMChange = (e) => {
    if (e.target.value >= 60 || e.target.value <= 250) {
      setBeatsPerMinute(e.target.value);
    }

    console.log(e.target);
  };

  // Handle Play button clicked
  const playHandler = () => {
    if (beatsPerMin < 60) {
      setBeatsPerMinute(60);
    } else if (beatsPerMin > 300) {
      setBeatsPerMinute(300);
    }
    setPlaying(!playing);
  };

  // Handle Pause button clicked
  const stopHandler = () => {
    setPlaying(!playing);
    setTimerStyle({
      from: { width: "0%", backgroundColor: "blue" },
      to: { width: "0%", backgroundColor: "blue" },
      config: { duration: 50 },
    });
  };

  const renderPlayStop = () => {
    if (
      playing &&
      selectedInstrument &&
      beatsPerMin > 59 &&
      beatsPerMin < 301
    ) {
      return <StopButton stopHandler={stopHandler} />;
    } else if (!playing && selectedInstrument) {
      return <PlayButton playHandler={playHandler} />;
    }
  };

  const renderBPM = () => {
    if (!playing) {
      return (
        <SelectBPM
          beatsPerMin={beatsPerMin}
          handleBPMChange={handleBPMChange}
          playing={playing}
        />
      );
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <SelectInstrument
              instrumentData={instrumentData}
              handleInstrumentChange={handleInstrumentChange}
              selectedInstrument={selectedInstrument}
              instruments={instruments}
              setInstruments={setInstruments}
            />
          </Col>
          <Col>
            <AddInstrument handleInstrumentAdd={handleInstrumentAdd} />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <SelectBPM
              beatsPerMin={beatsPerMin}
              handleBPMChange={handleBPMChange}
              playing={playing}
            />
          </Col>
          <Col className="text-center">
            {renderPlayStop()}

            {/* {playing && selectedInstrument ? (
              <PauseButton pauseHandler={pauseHandler} />
            ) : (
              <PlayButton playHandler={playHandler} />
            )} */}
          </Col>
          <Col xs={5}></Col>
        </Row>
        <Row>
          <Col>
            <InstrumentLayer
              beatBlocks={beatBlocks}
              state={state}
              setState={setState}
              handleAddTrack={handleAddTrack}
              handleRemoveTrack={handleRemoveTrack}
              styleProps={styleProps}
              playing={playing}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

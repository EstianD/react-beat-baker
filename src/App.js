import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useSound from "use-sound";
import "./App.css";
import instrumentData from "./instrumentData.json";

// Import useInterval Hook

import { Container, Row, Col, Modal } from "react-bootstrap";

// Components
import InstrumentLayer from "./Components/Layers/InstrumentLayer";
import SelectInstrument from "./Components/Header/SelectInstrument";
import AddInstrument from "./Components/Header/AddInstrument";
import PlayButton from "./Components/Header/PlayButton";
import StopButton from "./Components/Header/StopButton";
import SelectBPM from "./Components/Header/SelectBPM";
import SelectBeatBlocks from "./Components/Header/SelectBeatBlocks";
import VolumeSlider from "./Components/Header/VolumeSlider";
import SavedLibrary from "./Components/Header/SavedLibrary";

import acousticSound from "../src/Sounds/Acoustic/acoustic_full.mp3";

function App() {
  // const beatBlocks = 8;

  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setselectedInstrument] = useState("");
  const [state, setState] = useState({});
  const [playing, setPlaying] = useState(false);
  const [instrumentInput, setInstrumentInput] = useState("");

  const [beatBlocks, setBeatBlocks] = useState(8);
  const [beatsPerMin, setBeatsPerMinute] = useState(100);
  const [trackVolume, setTrackVolume] = useState(1);

  // LocalStorage state
  const [storageState, setStorageState] = useState([]);

  // State for save input
  const [saveInput, setSaveInput] = useState("");
  const [saveInputError, setSaveInputError] = useState("");

  // State to manage spring style for timer
  const [timerStyle, setTimerStyle] = useState({});

  const [styleState] = useState(timerStyle);

  // Modal states

  // For spring
  const [toggle, setToggle] = useState(true);

  let playTrackLoop;
  let testLoop;
  const BPMms = 60000;
  let playingNote;
  const beatBlockOptions = ["8", "16"];

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
    volume: trackVolume,
  });

  let stateExist = Object.keys(state).length !== 0;

  // UseEffect on Load
  useEffect(() => {
    // Temp Array for instruments before changing state
    let instrumentArr = [];
    setStorageState(Object.keys(localStorage));

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
        noteObj = {};
        if (loop < state.layers.closehat.length) {
          if (loop == 0) {
            for (
              let block = 1;
              block <= state.layers.closehat.length;
              block++
            ) {
              timeElement = document.getElementById(`beatblock-${block}`);
              if (timeElement) {
                console.log(timeElement);
                timeElement.classList.remove("played-time");
              }
            }
          }

          state.sounds.map((sound) => {
            indexSound = state.layers[sound][loop];

            console.log("LOOP2: ", loop);

            if (indexSound) {
              noteObj = {
                id: indexSound,
                volume: 0.25,
              };

              // ADD PLAYING NOTE
              acoustic(noteObj);
            }
            document
              .getElementById(`beatblock-${loop + 1}`)
              .classList.add("played-time");
          });
        }

        loop++;

        if (loop === state.layers.closehat.length) {
          loop = 0;
        }
        // loop++;
      }, BPMms / beatsPerMin);
    }
    return () => {
      clearInterval(playTrackLoop);
      setTimerStyle({});
    };
  }, [playing]);

  // Stop playing
  const stop = () => {
    clearInterval(playTrackLoop);
  };

  const handleInstrumentChange = (e) => {
    // setselectedInstrument(e.value);
    console.log(e.value);
    setInstrumentInput(e.value);
  };

  const handleInstrumentAdd = () => {
    setselectedInstrument(instrumentInput);
    console.log("here:", selectedInstrument);
    const instrumentConfig = instrumentData.filter((name) => {
      console.log(name.kit_name.includes(selectedInstrument));
      return name.kit_name.includes(instrumentInput);
      // name.kit_name.includes(selectedInstrument);
    });

    if (instrumentConfig !== 0) {
      // console.log("IF: ", instrumentConfig[0].sounds);
      instrumentConfig[0].sounds.map((sound) => {
        instrumentConfig[0].layers[sound] = Array(beatBlocks).fill(0);
      });
    }

    // console.log("STATE: ", instrumentConfig[0]);

    setState(instrumentConfig[0]);
  };

  // Handler for updating state after track is clicked
  const handleAddTrack = (index, sound) => {
    setState(state, (state.layers[sound][index] = sound));
  };

  const handleRemoveTrack = (index, sound) => {
    setState(state, (state.layers[sound][index] = 0));
  };

  const handleBPMChange = (e) => {
    if (e.target.value >= 60 || e.target.value <= 250) {
      setBeatsPerMinute(e.target.value);
    }

    console.log(e.target);
  };

  // Handle BeatBlock change
  const handleBeatBlockChange = (e) => {
    console.log(e.value);
    setBeatBlocks(parseInt(e.value));
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

  // SAVING TRACK FUNCTIONALITY
  // Handle input change on save input
  const handleSaveChange = (e) => {
    console.log(e.target.value);
    setSaveInput(e.target.value);

    if (Object.keys(localStorage).includes(e.target.value)) {
      setSaveInputError(
        "Track name already exists! Saving will overwrite existing track."
      );
    } else {
      setSaveInputError("");
    }
  };

  // Handler for saving a track
  const handleSaveTrack = () => {
    console.log("saving");

    localStorage.setItem(saveInput, JSON.stringify(state));

    setStorageState(storageState.concat(saveInput));
    // console.log(Object.keys(localStorage));
  };

  // Handler for saving a track
  const handleCloseTrack = () => {
    console.log("deleting");
    setState({});
  };

  // Delete saved track
  const deleteSavedTrack = (track) => {
    let trackName = track.target.id;
    if (trackName) {
      console.log(trackName);

      // console.log("yes");
      localStorage.removeItem(trackName);
      setStorageState(storageState.filter((track) => track !== trackName));
    }
  };

  // Load saved track
  const loadSavedTrack = (track) => {
    let trackName = track.target.id;
    if (trackName) {
      console.log(trackName);
      let savedState = JSON.parse(localStorage.getItem(trackName));

      setState((prevState) => savedState);

      console.log(JSON.parse(localStorage.getItem(trackName)));
    }
  };

  // const handleVolumeChange = (e) => {
  //   console.log(e.target.value);
  //   setTrackVolume(e.target.value);
  // };

  const renderInstrumentLayer = () => {
    return (
      <InstrumentLayer
        beatBlocks={beatBlocks}
        state={state}
        setState={setState}
        handleAddTrack={handleAddTrack}
        handleRemoveTrack={handleRemoveTrack}
        styleProps={styleProps}
        playing={playing}
        handleSaveTrack={handleSaveTrack}
        handleCloseTrack={handleCloseTrack}
        handleSaveChange={handleSaveChange}
        saveInputError={saveInputError}
      />
    );
  };

  const renderSavedLibrary = () => {
    if (!stateExist) {
      return (
        <SavedLibrary
          deleteSavedTrack={deleteSavedTrack}
          loadSavedTrack={loadSavedTrack}
          storageState={storageState}
          state={state}
        />
      );
    }
  };

  const renderPlayStop = () => {
    if (stateExist) {
      if (
        playing &&
        selectedInstrument &&
        beatsPerMin > 59 &&
        beatsPerMin < 301
      ) {
        return <StopButton stopHandler={stopHandler} />;
      } else if (!playing) {
        return <PlayButton playHandler={playHandler} />;
      }
    }
  };

  const renderBPM = () => {
    if (stateExist) {
      return (
        <SelectBPM
          beatsPerMin={beatsPerMin}
          handleBPMChange={handleBPMChange}
          playing={playing}
        />
      );
    }
  };

  const renderAddInstrument = () => {
    if (instrumentInput && !stateExist) {
      return <AddInstrument handleInstrumentAdd={handleInstrumentAdd} />;
    }
  };

  const renderInstrumentSelect = () => {
    if (!stateExist) {
      return (
        <SelectInstrument
          instrumentData={instrumentData}
          handleInstrumentChange={handleInstrumentChange}
          selectedInstrument={selectedInstrument}
          instruments={instruments}
          setInstruments={setInstruments}
        />
      );
    }
  };

  const renderBeatBlockSelect = () => {
    if (!stateExist) {
      return (
        <SelectBeatBlocks
          playing={playing}
          beatBlocks={beatBlocks}
          handleBeatBlockChange={handleBeatBlockChange}
          beatBlockOptions={beatBlockOptions}
          state={state}
        />
      );
    }
  };

  const renderVolumeSlider = () => {
    if (selectedInstrument && !playing) {
      return (
        <VolumeSlider
          trackVolume={trackVolume}
          setTrackVolume={setTrackVolume}
        />
      );
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={3}>{renderInstrumentSelect()}</Col>
          <Col xs={3}>{renderBeatBlockSelect()}</Col>
          <Col xs={3}>{renderAddInstrument()}</Col>
          <Col xs={2}>{renderSavedLibrary()}</Col>
        </Row>
        <Row>
          <Col xs={2}></Col>
          <Col xs={10}></Col>
        </Row>
        <Row>
          <Col xs={5}>{renderBPM()}</Col>

          <Col xs={2} className="text-center">
            {renderPlayStop()}
          </Col>
          <Col xs={5}></Col>
        </Row>

        <Row>
          <Col>{renderInstrumentLayer()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useSound from "use-sound";
import "./App.css";
import instrumentData from "./instrumentData.json";

import { Container, Row, Col, Modal } from "react-bootstrap";

// Components
import InstrumentLayer from "./Components/Layers/InstrumentLayer";
import SelectInstrument from "./Components/Header/SelectInstrument";
import AddInstrument from "./Components/Header/AddInstrument";
import PlayButton from "./Components/Header/PlayButton";
import StopButton from "./Components/Header/StopButton";
import SelectBPM from "./Components/Header/SelectBPM";
import SelectBeatBlocks from "./Components/Header/SelectBeatBlocks";

import SavedLibrary from "./Components/Header/SavedLibrary";

import acousticSound from "../src/Sounds/Acoustic/acoustic-complete.mp3";

function App() {
  // const beatBlocks = 8;

  // Global states
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setselectedInstrument] = useState("");
  const [state, setState] = useState({});
  const [playing, setPlaying] = useState(false);
  const [instrumentInput, setInstrumentInput] = useState("");

  const [beatBlocks, setBeatBlocks] = useState(8);
  const [beatsPerMin, setBeatsPerMinute] = useState(200);
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

  const [acoustic, stopAcoustic] = useSound(acousticSound, {
    sprite: {
      Closehat: [0, 275],
      Snare: [500, 290],
      Kick: [800, 285],
      Flam: [1200, 315],
      Rim: [1600, 210],
      Splash: [1900, 420],
      Tom1: [2400, 430],
      Tom2: [2900, 640],
      Tom3: [3600, 330],
    },
    interupt: false,
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
    let loop = 0;
    let indexSound;
    let noteObj = {};
    let timeElement;

    playTrackLoop = null;

    if (playing) {
      // Create interval for playing the track
      playTrackLoop = setInterval(() => {
        // Create a note object to load the sound with
        noteObj = {};
        if (loop < state.beatblocks) {
          if (loop == 0) {
            for (let block = 1; block <= state.beatblocks; block++) {
              timeElement = document.getElementById(`beatblock-${block}`);
              if (timeElement) {
                timeElement.classList.remove("played-time");
              }
            }
          }

          // Loop through all sounds to get selected notes
          state.sounds.map((sound) => {
            indexSound = state.layers[sound][loop];

            if (indexSound) {
              noteObj = {
                id: indexSound,
              };

              // Check which instrument is playing
              switch (state.kit_name) {
                case "Acoustic":
                  // ADD PLAYING NOTE
                  acoustic(noteObj);
              }
            }
            document
              .getElementById(`beatblock-${loop + 1}`)
              .classList.add("played-time");
          });
        }
        // Go to next iteration
        loop++;
        // If loop is on its last iteration, set it to 0 to start over
        if (loop === state.beatblocks) {
          loop = 0;
        }
      }, BPMms / beatsPerMin); //Calculate interval time based on BPM
    }
    return () => {
      clearInterval(playTrackLoop);
      setTimerStyle({});
    };
  }, [playing]);

  // Stop playing
  // const stop = () => {
  //   clearInterval(playTrackLoop);
  // };

  // useEffect(() => {

  // }, [instrumentInput])

  // Set state for selected instrument on change
  // const handleInstrumentChange = (e) => {
  //   setInstrumentInput(e.value);
  // };

  // Handle the changing/adding of instrument
  const handleInstrumentAdd = () => {
    setselectedInstrument(instrumentInput);
    // Filter selected instrument
    const instrumentConfig = instrumentData.filter((name) => {
      return name.kit_name.includes(instrumentInput);
    });
    // Check if instrument selected
    if (instrumentConfig !== 0) {
      // Loop through sounds of selected instrument to create arrays for all sounds
      instrumentConfig[0].sounds.map((sound) => {
        instrumentConfig[0].layers[sound] = Array(beatBlocks).fill(0);
      });
      instrumentConfig[0].beatblocks = beatBlocks;
    }
    // Set state for selected instrument
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
    if (e.target.value >= 60 || e.target.value <= 1000) {
      setBeatsPerMinute(e.target.value);
    }
  };

  // Handle BeatBlock change
  const handleBeatBlockChange = (e) => {
    setBeatBlocks(parseInt(e.value));
  };

  // Handle Play button clicked
  const playHandler = () => {
    // Limit the bpm that can be selected
    if (beatsPerMin < 60) {
      setBeatsPerMinute(60);
    } else if (beatsPerMin > 1000) {
      setBeatsPerMinute(1000);
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
    // Save track name to state
    setState(state, (state.saved_name = saveInput));
    // Store track in local storage
    localStorage.setItem(saveInput, JSON.stringify(state));
    // Set local storage state
    setStorageState(storageState.concat(saveInput));
  };

  // Handler for saving a track
  const handleCloseTrack = () => {
    console.log("deleting");
    setPlaying(false);
    setState({});
  };

  // Handle onClick for sound
  const handleSoundIcon = (e) => {
    let soundObj = {};
    let soundIcon = e.target.id;

    soundObj = {
      id: soundIcon,
    };

    // Check which instrument is playing
    switch (state.kit_name) {
      case "Acoustic":
        // ADD PLAYING NOTE
        acoustic(soundObj);
    }
  };

  // Delete saved track
  const deleteSavedTrack = (track) => {
    let trackName = track.target.id;
    if (trackName) {
      console.log(trackName);

      // Remove track from local storage
      localStorage.removeItem(trackName);
      // Update local storage
      setStorageState(storageState.filter((track) => track !== trackName));
    }
  };

  // Load saved track
  const loadSavedTrack = (track) => {
    let trackName = track.target.id;
    if (trackName) {
      let savedState = JSON.parse(localStorage.getItem(trackName));

      setState((prevState) => savedState);
    }
  };

  // Render App title
  const renderTitle = () => {
    return (
      <div className="title-row">
        <h3 className="title-header">Beat Baker</h3>
      </div>
    );
  };

  // Render Instrument layer
  const renderInstrumentLayer = () => {
    return (
      <InstrumentLayer
        beatBlocks={beatBlocks}
        state={state}
        setState={setState}
        handleAddTrack={handleAddTrack}
        handleRemoveTrack={handleRemoveTrack}
        playing={playing}
        handleSaveTrack={handleSaveTrack}
        handleCloseTrack={handleCloseTrack}
        handleSaveChange={handleSaveChange}
        saveInputError={saveInputError}
        handleSoundIcon={handleSoundIcon}
      />
    );
  };

  // Render saved library
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

  // Render play/stop button
  const renderPlayStop = () => {
    if (stateExist) {
      if (playing && beatsPerMin > 59 && beatsPerMin < 1001) {
        return <StopButton stopHandler={stopHandler} />;
      } else if (!playing) {
        return <PlayButton playHandler={playHandler} />;
      }
    }
  };

  // Render BPM selector
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

  // Render add instrument button
  const renderAddInstrument = () => {
    if (instrumentInput && !stateExist) {
      return <AddInstrument handleInstrumentAdd={handleInstrumentAdd} />;
    }
  };

  // Render select instrument dropdown
  const renderInstrumentSelect = () => {
    if (!stateExist) {
      return (
        <SelectInstrument
          instrumentData={instrumentData}
          // handleInstrumentChange={handleInstrumentChange}
          selectedInstrument={selectedInstrument}
          instruments={instruments}
          setInstruments={setInstruments}
          instrumentInput={instrumentInput}
          setInstrumentInput={setInstrumentInput}
        />
      );
    }
  };

  // Render beat block select
  const renderBeatBlockSelect = () => {
    if (!stateExist) {
      return (
        <SelectBeatBlocks
          beatBlocks={beatBlocks}
          handleBeatBlockChange={handleBeatBlockChange}
          beatBlockOptions={beatBlockOptions}
          state={state}
        />
      );
    }
  };

  // Render saved named if track is saved
  const renderSavedName = () => {
    if (state.saved_name) {
      return (
        <div className="saved-track-title">
          <h5>{state.saved_name}</h5>
        </div>
      );
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>{renderTitle()}</Col>
        </Row>
        <Row>
          <Col xs={3}>{renderInstrumentSelect()}</Col>
          <Col xs={3}>{renderBeatBlockSelect()}</Col>
          <Col xs={2}>{renderAddInstrument()}</Col>
          <Col xs={4}>{renderSavedLibrary()}</Col>
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
          <Col xs={5}>{renderSavedName()}</Col>
        </Row>

        <Row>
          <Col>{renderInstrumentLayer()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

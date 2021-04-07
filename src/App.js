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
import electronicSound from "../src/Sounds/Electro/electronic-complete.mp3";

// Import logo
import logo from "./Images/drum-logo.png";

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
  const [toggle, setToggle] = useState(true);

  let playTrackLoop, testLoop, playingNote;
  const BPMms = 60000;
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

  const [electronic, stopElectronic] = useSound(electronicSound, {
    sprite: {
      Snare: [0, 415],
      Kick: [450, 190],
      Floor: [650, 675],
      Openhat: [1350, 705],
      Tom1: [2100, 200],
      Beam: [2450, 815],
      Boom: [3300, 285],
      Screach: [3600, 310],
      Tom2: [3950, 880],
      Floor2: [4850, 610],
      Dead: [5500, 165],
      Cowbell: [5700, 360],
      Robot: [6100, 1100],
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
    let indexSound, timeElement;
    let noteObj = {};

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
                case "Electronic":
                  electronic(noteObj);
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
        break;
      case "Electronic":
        electronic(soundObj);
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
      <div className="app-header">
        <h3 className="app-title">
          Beat
          <img src={logo} alt="Logo" />
          Baker
        </h3>
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
    if (playing && beatsPerMin > 59 && beatsPerMin < 1001) {
      return <StopButton stopHandler={stopHandler} />;
    } else if (!playing) {
      return <PlayButton playHandler={playHandler} />;
    }
  };

  // Render BPM selector
  const renderBPM = () => {
    return (
      <SelectBPM
        beatsPerMin={beatsPerMin}
        handleBPMChange={handleBPMChange}
        playing={playing}
      />
    );
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
    return (
      <div>
        <span className="saved-track-title">{state.saved_name}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="top-header">{renderTitle()}</div>
        <div className="config-container">
          <div className="config-instrument-select">
            {renderInstrumentSelect()}
          </div>
          <div className="config-block-select">{renderBeatBlockSelect()}</div>
          <div className="config-instrument-add">{renderAddInstrument()}</div>
          <div className="config-saved-library">{renderSavedLibrary()}</div>
        </div>

        <div className="controls-container">
          {stateExist && (
            <>
              <div className="bpm-control">{renderBPM()}</div>
              <div className="play-control">{renderPlayStop()}</div>
            </>
          )}

          <div className="playing-saved-control">{renderSavedName()}</div>

          {/* {state.saved_name && (
            <div className="playing-saved-control">{renderSavedName()}</div>
          )} */}
        </div>
        <br />
        <div className="instrument-container">{renderInstrumentLayer()}</div>
      </div>
    </div>
  );
}

export default App;

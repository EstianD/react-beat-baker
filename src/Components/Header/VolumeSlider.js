import React from "react";

const VolumeSlider = ({ trackVolume, setTrackVolume }) => {
  return (
    <div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={trackVolume}
        onChange={(e) => {
          setTrackVolume(e.target.valueAsNumber);
        }}
      />
    </div>
  );
};

export default VolumeSlider;

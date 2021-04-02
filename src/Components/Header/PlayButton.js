import React from "react";

import PlayBtnImage from "../../Images/play.png";

function PlayButton({ playHandler }) {
  return (
    <div>
      <img
        className="play-stop-btn"
        src={PlayBtnImage}
        alt="Play"
        onClick={playHandler}
      />
    </div>
  );
}

export default PlayButton;

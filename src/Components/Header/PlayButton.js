import React from "react";

import PlayBtnImage from "../../Images/button_play.png";

function PlayButton({ playHandler }) {
  return (
    <div>
      <img src={PlayBtnImage} alt="Play" onClick={playHandler} />
    </div>
  );
}

export default PlayButton;

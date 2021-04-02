import React from "react";

import StopBtnImage from "../../Images/stop.png";

function StopButton({ stopHandler }) {
  return (
    <div>
      <img
        className="play-stop-btn"
        src={StopBtnImage}
        alt="Pause"
        onClick={stopHandler}
      />
    </div>
  );
}

export default StopButton;

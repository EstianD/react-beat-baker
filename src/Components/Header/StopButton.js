import React from "react";

import StopBtnImage from "../../Images/button_stop.png";

function StopButton({ stopHandler }) {
  return (
    <div>
      <img src={StopBtnImage} alt="Pause" onClick={stopHandler} />
    </div>
  );
}

export default StopButton;

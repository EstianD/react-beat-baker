import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Note = ({
  instrumentId,
  onCellEnterHandler,
  onCellLeaveHandler,
  onCellClickHandler,
  cellValue,
}) => {
  const [classNames, setClassNames] = useState();

  useEffect(() => {
    setClassNames(cellValue === 0 ? "track-cell" : "track-cell active");
  }, []);

  return (
    <div
      className={classNames}
      id={instrumentId}
      onMouseEnter={(e) => onCellEnterHandler(e)}
      onMouseLeave={(e) => onCellLeaveHandler(e)}
      onClick={(e) => onCellClickHandler(e)}
    ></div>
  );
};

export default Note;

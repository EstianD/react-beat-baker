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
    setClassNames(cellValue === 0 ? "trackCell" : "trackCell active");
  }, []);

  return (
    <Col
      className={classNames}
      id={instrumentId}
      onMouseEnter={(e) => onCellEnterHandler(e)}
      onMouseLeave={(e) => onCellLeaveHandler(e)}
      onClick={(e) => onCellClickHandler(e)}
    ></Col>
  );
};

export default Note;

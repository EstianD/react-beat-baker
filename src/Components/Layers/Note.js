import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Note = ({
  instrumentId,
  onCellEnterHandler,
  onCellLeaveHandler,
  onCellClickHandler,
}) => {
  return (
    <Col
      className="trackCell"
      id={instrumentId}
      onMouseEnter={(e) => onCellEnterHandler(e)}
      onMouseLeave={(e) => onCellLeaveHandler(e)}
      onClick={(e) => onCellClickHandler(e)}
    ></Col>
  );
};

export default Note;

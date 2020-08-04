import React from "react";

import { Row, Col } from "react-bootstrap";

const SavedTrack = ({ track }) => {
  console.log(track);
  return (
    <div>
      <Row>
        <Col>{track}</Col>
      </Row>
    </div>
  );
};

export default SavedTrack;

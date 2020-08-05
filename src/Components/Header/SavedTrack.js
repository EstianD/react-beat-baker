import React from "react";

import { Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSync } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineDelete } from "react-icons/ai";

const SavedTrack = ({ track, deleteSavedTrack }) => {
  console.log(track);
  return (
    <div>
      <Row>
        <Col xs={8}>{track}</Col>
        <Col xs={2}>
          <Button size="sm" variant="outline-success">
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={(e) => deleteSavedTrack(e)}
            id={track}
          >
            <AiOutlineDelete />
            {/* <FontAwesomeIcon
              icon={faTrash}
              id={track}
              onClick={(e) => deleteSavedTrack(e)}
            /> */}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SavedTrack;

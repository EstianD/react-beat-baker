import React from "react";

import {
  Row,
  Col,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Glyphicon,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSync } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";

const SavedTrack = ({ track, deleteSavedTrack, loadSavedTrack }) => {
  console.log(track);
  return (
    <div className="saved-item">
      {/* container grid */}

      {/* item */}
      <div className="saved-name">{track}</div>
      {/* <Col xs={2}> */}
      {/* button */}
      <button
        className="saved-track-load"
        id={track}
        onClick={(e) => loadSavedTrack(e)}
      >
        <AiOutlineReload id={track} onClick={(e) => loadSavedTrack(e)} />
      </button>
      <button
        className="saved-track-delete"
        onClick={(e) => deleteSavedTrack(e)}
        id={track}
      >
        <AiOutlineDelete onClick={(e) => deleteSavedTrack(e)} id={track} />
      </button>
      {/* <ButtonGroup size="sm"> */}
      {/* <Button
          size="sm"
          variant="outline-success"
          id={track}
          onClick={(e) => loadSavedTrack(e)}
        >
          <AiOutlineReload id={track} onClick={(e) => loadSavedTrack(e)} />
        </Button> */}
      {/* <Button
          size="sm"
          variant="outline-danger"
          onClick={(e) => deleteSavedTrack(e)}
          id={track}
        >
          <AiOutlineDelete onClick={(e) => deleteSavedTrack(e)} id={track} />
        </Button>
      </ButtonGroup> */}
      {/* </Col> */}
      {/* item */}
      <Col xs={1}></Col>
    </div>
  );
};

export default SavedTrack;

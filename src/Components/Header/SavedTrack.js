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
      <div className="saved-name">{track}</div>
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
    </div>
  );
};

export default SavedTrack;

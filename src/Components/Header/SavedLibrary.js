import React from "react";
import { Row, Col } from "react-bootstrap";

import SavedTrack from "./SavedTrack";

const SavedLibrary = ({ deleteSavedTrack, storageState, state }) => {
  let savedTracks = [];

  storageState.map((savedTrack) => {
    savedTracks.push(
      <SavedTrack track={savedTrack} deleteSavedTrack={deleteSavedTrack} />
    );
  });

  return (
    <div>
      <h5>Saved Tracks</h5>
      <hr />
      {savedTracks}
    </div>
  );
};

export default SavedLibrary;

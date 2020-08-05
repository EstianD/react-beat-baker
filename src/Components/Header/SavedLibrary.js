import React from "react";
import { Row, Col } from "react-bootstrap";

import SavedTrack from "./SavedTrack";

const SavedLibrary = ({
  deleteSavedTrack,
  loadSavedTrack,
  storageState,
  state,
}) => {
  let savedTracks = [];

  storageState.map((savedTrack) => {
    savedTracks.push(
      <SavedTrack
        track={savedTrack}
        deleteSavedTrack={deleteSavedTrack}
        loadSavedTrack={loadSavedTrack}
      />
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

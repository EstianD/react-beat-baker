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

  // Loop through saved tracks
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
    <div className="saved-container">
      <h5>Saved Tracks</h5>
      <hr />
      {savedTracks}
    </div>
  );
};

export default SavedLibrary;

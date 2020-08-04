import React from "react";
import { Row, Col } from "react-bootstrap";

import SavedTrack from "./SavedTrack";

const SavedLibrary = () => {
  let savedTracks = [];

  Object.keys(localStorage).map((savedTrack) => {
    savedTracks.push(<SavedTrack track={savedTrack} />);
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

import React, { useState } from "react";

import { Button, Modal, Form } from "react-bootstrap";

function CloseTrackButton({ handleCloseTrack }) {
  //   Open/Close state of modal
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCloseClick = () => {
    handleCloseTrack();
    setShow(false);
  };

  return (
    <>
      <Button
        className="track-config-btn"
        variant="outline-danger"
        size="sm"
        onClick={handleOpen}
      >
        Close
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Close Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close this track? Unsaved tracks will be
          deleted!
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleCloseClick}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CloseTrackButton;

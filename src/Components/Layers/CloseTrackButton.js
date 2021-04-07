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
      <button className="track-close-btn" onClick={handleOpen}></button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Close Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close this track? Unsaved tracks will be
          deleted!
        </Modal.Body>

        <Modal.Footer>
          <button className="modal-btn-no" onClick={handleClose}>
            No
          </button>
          <button className="modal-btn-yes" onClick={handleCloseClick}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CloseTrackButton;

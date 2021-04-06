import React, { useState } from "react";

import { Button, Modal, Form } from "react-bootstrap";

function SaveTrackButton({
  handleSaveTrack,
  handleSaveChange,
  saveInputError,
}) {
  //   Open/Close state of modal
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSaveClick = () => {
    handleSaveTrack();
    handleClose();
  };
  return (
    <>
      <button className="track-save-btn" onClick={handleOpen}>
        Save
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Give your track a name!
          <Form.Group controlId="SaveSelector">
            <Form.Control
              className="save-input"
              type="text"
              placeholder="Cool Beat"
              onChange={handleSaveChange}
            />
          </Form.Group>
          <span className="save-input-error">{saveInputError}</span>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SaveTrackButton;

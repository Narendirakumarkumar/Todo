import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ContentModal = ({showmodal , handleShow, handleClose}) => {
    return (
        <>
            <Modal show={showmodal} size="lg" onHide={handleClose} aria-labelledby="title-lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ContentModal;
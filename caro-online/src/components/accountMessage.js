import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const accountMessage = props => {
  const { message, close, isNoti } = props;

  return (
    <Modal
      show={isNoti}
      onHide={close}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default accountMessage;

import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const gameMessage = props => {
  const { mess, isNoti, close } = props;

  return (
    <Modal
      show={isNoti}
      onHide={close}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="curplayer O">{mess}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={close}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default gameMessage;

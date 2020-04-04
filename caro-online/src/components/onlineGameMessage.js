import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const onlineGameMessage = props => {
  const { mess, isNoti, playAgain, reset } = props;

  return (
    <Modal
      show={isNoti}
      onHide={reset}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="curplayer O">{mess}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            playAgain();
            reset();
          }}
        >
          Chơi lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default onlineGameMessage;

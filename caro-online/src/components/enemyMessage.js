import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const enemyMessage = props => {
  const { response, isNoti, reset } = props;

  return (
    <Modal
      show={isNoti}
      onHide={() => response(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="curplayer O">ĐỐI PHƯƠNG CẦU HOÀ</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            response(true);
            reset();
          }}
        >
          Đồng ý
        </Button>
        <Button onClick={() => response(false)}>Từ chối</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default enemyMessage;

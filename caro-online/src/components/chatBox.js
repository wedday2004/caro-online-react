import React from 'react';
import $ from 'jquery';
import uuid from 'uuid';
import { Image, Form, Button } from 'react-bootstrap';
import './css/chatBox.css';

const chatBox = props => {
  const { user, enemy, send, messages } = props;

  const handleOnSubmit = e => {
    e.preventDefault();
    const mess = $('.chatForm').serializeArray();
    $('.type_msg').val('');
    send({ user: user.username, mess: mess[0].value });
    $('.msg_card_body').scrollTop(10000000000000);
  };
  return (
    <div className="card">
      <div className="card-body msg_card_body">
        {messages.map(message => {
          if (message.data.user === user.username) {
            return (
              <div key={uuid()} className="d-flex justify-content-end message">
                <div className="msg_cotainer_send">{message.data.mess}</div>
                <div className="img_cont_msg">
                  <Image
                    src={
                      user.avatar.indexOf('http') !== 0
                        ? `data:image/jpeg;base64,${user.avatar}`
                        : user.avatar
                    }
                    className="rounded-circle user_img_msg"
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={uuid()} className="d-flex justify-content-start message">
              <div className="img_cont_msg">
                <Image
                  src={
                    enemy.avatar.indexOf('http') !== 0
                      ? `data:image/jpeg;base64,${enemy.avatar}`
                      : enemy.avatar
                  }
                  className="rounded-circle user_img_msg"
                />
              </div>
              <div className="msg_cotainer">{message.data.mess}</div>
            </div>
          );
        })}
      </div>
      <div className="card-footer">
        <div className="input-group">
          <Form className="chatForm" onSubmit={handleOnSubmit}>
            <Form.Control required name="messgae" className="type_msg" />

            <Button type="submit" id="send" className="send_btn">
              GỬI
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default chatBox;

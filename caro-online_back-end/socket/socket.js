module.exports = server => {
  var io = require("socket.io")(server);
  var roomno = 1;
  io.on("connection", function(socket) {
    console.log("ket noi");
    // client yêu cầu tìm kiếm
    socket.on("find", data => {
      if (data.room === -1) {
        // khi client chưa có phòng
        if (
          // kiểm tra phòng trống
          io.nsps["/"].adapter.rooms["room-" + roomno] &&
          io.nsps["/"].adapter.rooms["room-" + roomno].length > 1
        ) {
          roomno++;
        }
        // tạo phòng mới
        socket.join("room-" + roomno);
        // gửi phòng về cho client
        socket.nsp.in("room-" + roomno).emit("connectToRoom", roomno);
        if (io.nsps["/"].adapter.rooms["room-" + roomno].length > 1) {
          // khi phòng đủ
          socket.nsp.in("room-" + roomno).emit("found");
          socket.nsp.in("room-" + roomno).emit("character", "O");
          // client gửi user data vô room khi đủ
        } else {
          socket.nsp.in("room-" + roomno).emit("character", "X");
        }
      }
    });
    socket.on("userdata", data => {
      socket.in("room-" + data.room).emit("enemy", data);
    });
    //client rời phòng
    socket.on("left", room => {
      socket.nsp.in("room-" + room).emit("someoneLeft");
      socket.leave("room-" + room);
      socket.leave("room-" + room);
    });
    socket.on("userPlay", data => {
      console.log(data);
      socket.in("room-" + data.clientRoom).emit("enemyPlay", data.vt);
    });

    //cau hoa
    socket.on("askTie", data => {
      console.log(data);
      socket.in("room-" + data.clientRoom).emit("enemyAskTie");
    });
    socket.on("tieResponse", data => {
      console.log(data);
      socket.in("room-" + data.clientRoom).emit("tieResponse", data.isAgree);
    });
    //undo
    socket.on("askUndo", data => {
      console.log(data);
      socket.in("room-" + data.clientRoom).emit("enemyAskUndo");
    });
    socket.on("undoResponse", data => {
      console.log(data);
      socket.in("room-" + data.clientRoom).emit("undoResponse", data.isAgree);
    });
    socket.on("undo", data => {
      console.log(data);
      socket.nsp
        .in("room-" + data.clientRoom)
        .emit("serverReqUndo", data.vtUndo);
    });
    //xin thua
    socket.on("surrender", data => {
      socket
        .in("room-" + data.clientRoom)
        .emit("enemySurrender", data.userCharacter);
    });
    //choi lai
    socket.on("askPlayAgain", data => {
      socket.in("room-" + data.clientRoom).emit("playAgain");
    });
    //nhan gui message
    socket.on("sendMessage", data => {
      console.log(data);
      socket.nsp.in("room-" + data.clientRoom).emit("receiveMessage", data);
    });
  });
};

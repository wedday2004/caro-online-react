var db = require("../db/db");
module.exports = {
  all: () => db.load("select * from user"),
  one: username => db.load(`select * from user where username = '${username}'`),
  add: acc => db.add("user", acc),
  update: entity => db.update("user", "username", entity),
  updateAvatar: (username, imgURl) =>
    db.load(
      `update user set avatar='${imgURl}' where username = '${username}' `
    ),
  updatePassword: (username, password) =>
    db.load(
      `update user set password='${password}' where username = '${username}' `
    )
};

var express = require("express");
var router = express.Router();
var account = require("../model/account");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// const multer = require("multer");
const upload = require("../middleware/middleware");
const resize = require("../function/resizeImage");
const path = require("path");
var fs = require("fs");

// var filename = "";
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/");
//   },
//   filename: (req, file, cb) => {
//     filename = file.fieldname + "-" + Date.now() + ".jpg";
//     cb(null, filename);
//   }
// });
// var upload = multer({
//   storage: storage
// });

router.get("/", (req, res, next) => {
  account.one(req.user.username).then(result => {
    delete result[0].password;
    result[0].avatarURL = result[0].avatar;
    try {
      // console.log(path.join(__dirname, "../" + result[0].avatar));
      var bitmap = fs.readFileSync(result[0].avatar, { encoding: "base64" });
      result[0].avatar = bitmap;
    } catch (e) {
      console.log(e);
    }
    res.json(result[0]);
  });
});

router.post("/register", (req, res, next) => {
  if (req.body.password !== "" && req.body.username !== "") {
    let acc = {
      username: req.body.username,
      password: req.body.password,
      avatar:
        "https://i.pinimg.com/originals/fd/0c/55/fd0c559856ca991e9e28937dc802f0b0.png"
    };
    account
      .one(acc.username)
      .then(result => {
        if (result.length === 0) {
          bcrypt.hash(acc.password, 10, (err, encrypted) => {
            acc.password = encrypted;
            account
              .add(acc)
              .then(() =>
                res.json({
                  username: acc.username,
                  message: "Succeed"
                })
              )
              .catch(e => next(e));
          });
        } else {
          res.json({ username: "", password: "", message: "Existed" });
        }
      })
      .catch(e => next(e));
  } else res.json({ username: "", password: "", message: "Error" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Wrong",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user: user.username, token });
    });
  })(req, res);
});
router.post("/changepassword", (req, res, next) => {
  if (req.body.password !== "" && req.body.username !== "") {
    const username = req.body.username;
    const password = req.body.password;
    let newpassword = req.body.newpassword;
    account
      .one(username)
      .then(result => {
        if (result.length === 1) {
          bcrypt.compare(password, result[0].password, (err, result) => {
            if (result === true) {
              bcrypt.hash(newpassword, 10, (err, encrypted) => {
                newpassword = encrypted;
                account.updatePassword(username, newpassword).then(result => {
                  if (result.affectedRows === 1) {
                    res.json({ message: "Succeed" });
                  } else {
                    res.json({ message: "Wrong" });
                  }
                });
              });
            } else res.json({ message: "Wrong" });
          });
        } else res.json({ message: "Wrong" });
      })
      .catch(e => next(e));
  } else res.json({ message: "Error" });
});

router.post("/updateinfo", (req, res, next) => {
  if (req.body.name !== "" && req.body.age !== "") {
    let acc = {
      username: req.body.username,
      avatar: req.body.avatar,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age
    };
    account
      .update(acc)
      .then(result => {
        if (result === 1) {
          return res.json({
            message: "Succeed"
          });
        } else {
          return res.status(400).json({
            message: "Wrong"
          });
        }
      })
      .catch(e => next(e));
  } else res.json({ message: "Error" });
});

router.post("/uploadavatar", upload.single("avatarimage"), (req, res, next) => {
  // if (!req.file) {
  //   console.log("No file received");
  //   return res.json({
  //     Message: "No image uploaded ! Please try again !"
  //   });
  // }
  // var newimg = "/public/images/" + filename;
  // account.updateAvatar(req.body.username, newimg).then(() => {
  //   return res.status(200).json({ name: newimg, message: "Succeed" });
  // });

  const imagePath = path.join(__dirname, "../public/images");
  const fileUpload = new resize(imagePath);
  if (!req.file) {
    res.status(401).json({ error: "Wrong" });
  } else {
    fileUpload.save(req.file.buffer).then(filename => {
      account
        .updateAvatar(req.body.username, imagePath + "/" + filename)
        .then(() => {
          return res
            .status(200)
            .json({ name: imagePath + "/" + filename, message: "Succeed" });
        });
    });
  }
});

module.exports = router;

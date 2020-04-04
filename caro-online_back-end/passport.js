const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const account = require("./model/account");
const passportJWT = require("passport-jwt");
var bcrypt = require("bcrypt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, completion) {
      return account
        .one(username)
        .then(result => {
          if (result.length === 0) {
            return completion(null, false, { message: "User not found !" });
          }
          bcrypt.compare(password, result[0].password, (err, res) => {
            if (res === true) {
              var data = new Object();
              data.username = result[0].username;
              data.password = result[0].password;
              return completion(null, data, {
                message: "Logged In Successfully !"
              });
            } else {
              return completion(null, false, {
                message: "Password is incorrect !"
              });
            }
          });
        })
        .catch(err => completion(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, completion) {
      console.log(ExtractJWT);
      return account
        .one(jwtPayload.username)
        .then(user => {
          var data = new Object();
          data.username = user[0].username;
          data.password = user[0].password;
          return completion(null, data);
        })
        .catch(err => {
          return completion(err);
        });
    }
  )
);

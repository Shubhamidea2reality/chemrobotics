import jwt from "jsonwebtoken";
/* bcrypt for salt and hash password */
import bcrypt from "bcrypt";

const jwtKey = "y6ObUqti1A#o";
//const jwtExpirySeconds = 180
//const jwtExpirySeconds = 900
const jwtExpirySeconds = 6000;

import CryptoJS from "crypto-js";

const users = {
  chemrobouser: "SCiq#6K02F#f",
};

export const signIn = (req, res) => {
  // Get credentials from JSON body
  const { username, password } = req.body;
  let postdata = { username: username, password: password };
  //console.log(req.body);

  // if (!username || !password || users[username] !== password) {
  // 	// return 401 error is username or password doesn't exist, or if password does
  // 	// not match the password in our records
  // 	return res.status(401).end()
  // }

  req.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ message: err.toString() });
    }
    connection.query(
      `CALL dbp_chemrobo_emp_login('${JSON.stringify(postdata)}');`,
      function (err, rows) {
        if (err) {
          res.status(500).json({ message: err.toString() });
        } else {
          let username = null;
          let userid = null;
          let role_id = null;
          let datauser = rows[0][0];
          let hash = "";
          console.log(datauser);
          if (rows.length > 0) {
            username = datauser.user_username;
            userid = datauser.id;
            role_id = datauser.user_role;
            hash = datauser.user_password;
            console.log(username);
          }

          if (!username) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return res.status(401).end();
          }
          let pass_check = bcrypt.compareSync(password, hash);
          //console.log(pass_check);
          if (pass_check == false) {
            return res.status(401).end();
          }

          // Create a new token with the username in the payload
          // and which expires 300 seconds after issue
          const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          });
          //console.log("token:", token)

          return res.send(
            JSON.stringify({
              userid: userid,
              role_id: role_id,
              username: username,
              token: token,
            })
          );
          //res.status(200).json(rows);
        }
      }
    );
  });
  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  // const token = jwt.sign({ username }, jwtKey, {
  // 	algorithm: "HS256",
  // 	expiresIn: jwtExpirySeconds,
  // })
  // console.log("token:", token)

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000

  //res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })

  //res.end()
  //console.log(JSON.stringify({username:username,token:token}));

  //return res.send(JSON.stringify({userid :1,role_id:1,username:username,token:token}));
  //return res.send({username:username});
};

export const auto_login = (req, res) => {
  // Get credentials from JSON body
  const { accesskey } = req.body;

  let userid = Buffer.from(accesskey, "base64").toString();

  let username = null;
  let email = "";
  let privilege_json = "";

  let postdata = { mode: "AUTO_LOGIN", userid: userid };

  req.getConnection(function (err, connection) {
    connection.query(
      `CALL dbp_usermaster_manage('${JSON.stringify(postdata)}');`,
      function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.send({ status: "error", Message: err.sqlMessage });
        } else {
          username = rows[0][0].username;
          email = rows[0][0].email;
          privilege_json = CryptoJS.AES.encrypt(
            rows[0][0].privilege_json,
            process.env.ENCRYPTION_SECRECT_KEY
          ).toString();
          //console.log(rows[0].id);

          if (!username) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return res.status(401).end();
          }

          // Create a new token with the username in the payload
          // and which expires 300 seconds after issue
          const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          });
          console.log("token:", token);

          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds, so we multiply by 1000

          //res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })

          //res.end()
          //console.log(JSON.stringify({username:username,token:token}));

          return res.send(
            JSON.stringify({
              userid: userid,
              username: username,
              token: token,
              email: email,
              user_privilege: privilege_json,
            })
          );
        }
      }
    );
  });
};

export const user_login = (req, res) => {
  //console.log(req.body );
  // Get credentials from JSON body
  const { username, password } = req.body;
  let postdata = { mode: "GET_USER", username: username, password: password };
  console.log(postdata);
  // if (!username || !password || users[username] !== password) {
  // 	// return 401 error is username or password doesn't exist, or if password does
  // 	// not match the password in our records
  // 	return res.status(401).end()
  // }

  //let userid=Buffer.from(accesskey, 'base64').toString();

  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue

  req.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ message: err.toString() });
    }
    connection.query(
      `CALL dbp_usermaster_manage('${JSON.stringify(postdata)}');`,
      function (err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          res.send({ status: "error", Message: err.sqlMessage });
        } else {
          let username = null;
          let userid = 0;
          let email = "";
          let privilege_json = "";
          //console.log(rows[0]);
          if (rows.length > 0) {
            userid = rows[0][0].id;
            username = rows[0][0].username;
            email = rows[0][0].email;
            privilege_json = CryptoJS.AES.encrypt(
              JSON.stringify(rows[0][0].privilege_json),
              process.env.ENCRYPTION_SECRECT_KEY
            ).toString();
            console.log(username);
          }

          if (!username) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return res.status(401).end();
          }

          // Create a new token with the username in the payload
          // and which expires 300 seconds after issue
          const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          });
          console.log("token:", token);

          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds, so we multiply by 1000

          //res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })

          //res.end()
          //console.log(JSON.stringify({username:username,token:token}));

          return res.send(
            JSON.stringify({
              userid: userid,
              username: username,
              token: token,
              email: email,
              user_privilege: privilege_json,
            })
          );
        }
      }
    );
  });
};

export const verify = (req, res, next) => {
  //console.log(req);
  // We can obtain the session token from the requests cookies, which come with every request
  let token = req.header("Authorization");
  //console.log("Verify token:", token)
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).send();
  }

  var payload;
  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).send();
    }
    // otherwise, return a bad request error
    return res.status(400).send();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  //res.send(`Welcome ${payload.username}!`)
};

export const refresh = (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  //const token = req.cookies.token
  let token = req.header("Authorization");

  let userid = req.body.userid;
  let email = req.body.email;
  let privilege_json = req.body.user_privilege;

  if (!token) {
    return res.status(401).end();
  }

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  // const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  // if (payload.exp - nowUnixSeconds > 60) {
  // 	return res.status(400).end()
  // }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  // Set the new token as the users `token` cookie
  //res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
  //res.end()

  console.log(`refresh token ${payload.username}`);

  return res.send(
    JSON.stringify({
      userid: userid,
      role_id: 1,
      username: payload.username,
      token: newToken,
      email: email,
      user_privilege: privilege_json,
    })
  );
};

export const usermaster_manage = (req, res) => {
  req.getConnection(function (err, connection) {
    connection.query(
      `CALL dbp_usermaster_manage('${JSON.stringify(req.body)}');`,
      function (err, rows) {
        if (err) {
          res.status(500).json({ message: err.toString() });
        } else {
          res.status(200).json(rows[0][0]);
        }
      }
    );
  });
};

export const welcome = (req, res) => {
  res.send(`Hi..Welcome!`);
};



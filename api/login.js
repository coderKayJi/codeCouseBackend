const express = require("express");
const router = express.Router();
const client = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = "M#-SEcr#T-*#Y";//genarlly saved in config.env

router.post("/", async (req, res, next) => {
  try {
    let { email, password } = req.body;

    client.query(
      `SELECT * FROM signup_details WHERE email=$1`,
      [email],
      (err, results) => {
        if (err) {
          next(err.toString());
        } else {
          if (results.rows != 0) {
            bcrypt.compare(password, results.rows[0]?.password, (err, result) => {
              if (err || !result) {
                return res
                  .status(401)
                  .json({
                    error: true,
                    success: false,
                    message: "Wrong Password",
                  });
              } else {
                const token = jwt.sign(
                  {
                    userId: results.rows[0]?.email,
                    username: results.rows[0]?.name,
                  },
                  secretKey
                );
                client.query(
                  `UPDATE signup_details SET token=$1 WHERE email=$2`,
                  [token,results.rows[0]?.email],
                  (err, results) => {
                    if (err) {
                      next(err.toString());
                    } else {
                        res.status(200).json({
                            success: true,
                            error: false,
                            token:token,
                            msg: "Login Successful",
                          });
                    }
                  }
                );
              }
            });
          }else{
            res.status(400).json({
                success: false,
                error: true,
                msg: "Email not Registered"
              });
          }
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;

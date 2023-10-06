const express = require("express");
const router = express.Router();
const client = require("../database");
const bcrypt = require('bcrypt');

router.post("/", async (req, res, next) => {
  try {
    let { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    client.query(
      `SELECT * FROM signup_details WHERE email=$1`,
      [email],
      (err, results) => {
        if (err) {
          next(err.toString());
        } else {
          if (results.rowCount == 0) {
            client.query(
              `INSERT INTO signup_details (name, email,mobile,password)
                          VALUES ($1,$2,$3,$4)`,
              [name, email, mobile, hashedPassword],
              (err, results) => {
                if (err) {
                  next(err.toString());
                } else {
                  res.status(200).json({
                    success: true,
                    error: false,
                    msg: "Signup Successful!",
                  });
                }
              }
            );
          }else{
            res.status(400).json({
              success: false,
              error: true,
              msg: "Emailid Already Registered!",
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

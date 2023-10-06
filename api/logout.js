const express = require("express");
const router = express.Router();
const client = require("../database");

router.post("/", (req, res,next) => {
  let { emailid } = req.body;
  client.query(
    `UPDATE signup_details SET token=$1 WHERE email=$2`,
    [null, emailid],
    (err, results) => {
      if (err) {
        next(err.toString());
      } else {
        res.status(200).json({
          success: true,
          error: false,
          msg: "Logout Successfully.",
        });
      }
    }
  );
});

module.exports = router;


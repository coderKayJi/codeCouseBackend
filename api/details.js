const express = require("express");
const router = express.Router();
const client = require("../database");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken"); // Import the verifyToken middleware

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;

    client.query(
      `SELECT * FROM signup_details WHERE email = $1`,
      [userId],
      (err, results) => {
        if (err) {
          next(err.toString());
        } else {
          const profileData = {
            name: results.rows[0]?.name,
            emailid: results.rows[0]?.email,
            mobile: results.rows[0]?.mobile,
            plan: results.rows[0]?.current_plan,
          };
          res.status(200).json({
            success: true,
            error: false,
            msg: "Details Fetched Successfully",
            data: { ...profileData },
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const client = require("../database");

const secretKey = "M#-SEcr#T-*#Y"; //genarlly saved in config.env

router.post("/", async (req, res, next) => {
  try {
    client.query(`SELECT * FROM plan`, (err, results) => {
      if (err) {
        next(err.toString());
      } else {
        res.status(200).json({
          success: true,
          error: false,
          data: results.rows,
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

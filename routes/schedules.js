const router = require("express").Router();
const Schedule = require("../models/scheduleModel");
let mongoose = require("mongoose");

router.post("/book", async (req, res) => {
  try {
    console.log(req.body)
    let { selectedDate } = req.body;

    const newApt = new Schedule({
      selectedDate,
    });

    Schedule.create(newApt, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send('succesfully created');
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

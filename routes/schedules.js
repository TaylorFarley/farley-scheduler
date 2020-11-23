const router = require("express").Router();
const Schedule = require("../models/scheduleModel");
let mongoose = require("mongoose");

router.post("/book", async (req, res) => {
  try {
    console.log(req.body)
    let { selectedDate, uid } = req.body;

    const newApt = new Schedule({
      selectedDate,
      uid
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


router.post("/getschedule", async (req, res) => {
  try {
    console.log(req.body.uid)
    
      Schedule.find({ uid: req.body.uid }, (error, data) => {
        if (error) {
          return next(error)
        } else {
        
          res.send(data);
        
        }
      })
    }catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



module.exports = router;

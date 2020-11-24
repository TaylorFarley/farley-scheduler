const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ScheduleSchema = new Schema({
  selectedDate: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Schedule = mongoose.model("Schedules", ScheduleSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let scheduleSchema = new Schema(
  {
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    time: {
      type: String,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    collection: "schedules",
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);

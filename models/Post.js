const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    }
  },
});

module.exports = mongoose.model("Post", PostSchema);
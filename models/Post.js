const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [
      {
        name: {
          type: String,
          maxLength: 20,
          required: true,
        },
        category: {
          type: String,
          enum: [
            "tech",
            "lifestyle",
            "news",
            "science",
            "business",
            "education",
            "sports"
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    question: {
      type: String,
      
    },
    answer: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Question", QuestionSchema);
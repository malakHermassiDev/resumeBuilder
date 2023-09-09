const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    domain: {
      type: String,
    },
    YearsOfExperience: String,
    description: String,
    company: {
        type: String,
      }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Experience", ExperienceSchema);
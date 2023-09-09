const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    school: {
      type: String,
    },
    specialty: String,
    dateOfGraduation:{
        type:Date
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Education", EducationSchema);
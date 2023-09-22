const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema(
  {
    username: {
      type: String,    
    },
    skill: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Skill", SkillSchema);
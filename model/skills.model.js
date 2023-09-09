const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema(
  {
    username: {
      type : mongoose.Schema.Types.ObjectId , 
      ref : 'Client',
      require : true
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
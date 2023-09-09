// 
// // Create and Save a new admin
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.username) {
//     return res.status(400).send({
//       message: "admin content can not be empty",
//     });
//   }
//   // Create a admin
//   const skill = new Skill({
//     username: req.body.username || "Untitled Skill",
//     skill: req.body.skill,
//   });
//   // Save skill in the database
//   skill
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the skill.",
//       });
//     });
// };

// // Retrieve and return all skill from the database.
// exports.findAll = (req, res) => {
//   Skill.find()
//     .then((skills) => {
//       res.send(skills);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving skills.",
//       });
//     });
// };

// // Find a single skill with a skillId
// exports.findOne = (req, res) => {
//   Skill.findById(req.params.skillId)
//     .then((skill) => {
//       if (!skill) {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       res.send(skill);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       return res.status(500).send({
//         message: "Error retrieving skill with id " + req.params.skillId,
//       });
//     });
// };

// // Update a skill identified by the skillId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body.username) {
//     return res.status(400).send({
//       message: "skill content can not be empty",
//     });
//   }

//   // Find skill and update it with the request body
//   Skill.findByIdAndUpdate(
//     req.params.skillId,
//     {
//       username: req.body.username || "Untitled skill",
//       skill: req.body.skill,
      
//     },
//     { new: true }
//   )
//     .then((skill) => {
//       if (!skill) {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       res.send(skill);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       return res.status(500).send({
//         message: "Error updating skill with id " + req.params.skillId,
//       });
//     });
// };

// // Delete a skill with the specified skillId in the request
// exports.delete = (req, res) => {
//   Skill.findByIdAndRemove(req.params.skillId)
//     .then((skill) => {
//       if (!skill) {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       res.send({ message: "skill deleted successfully!" });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "skill not found with id " + req.params.skillId,
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete skill with id " + req.params.skillId,
//       });
//     });
// };

const Skill = require("../model/skills.model.js");
const Client = require("../model/user.model.js");

// Create and Save a new skill
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "Client username cannot be empty",
    });
  }

  try {
    // Find the client by username
    const client = await Client.findOne({ name: req.body.name });

    if (!client) {
      return res.status(404).send({
        message: "Client not found with username " + req.body.name,
      });
    }

    // Create a skill
    const skill = new Skill({
      username: client.name, // Use the client's username
      skill: req.body.skill,
    });

    // Save the skill in the database
    const savedSkill = await skill.save();

    res.send(savedSkill);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the skill.",
    });
  }
};

// Retrieve and return all skills from the database.
exports.findAll = (req, res) => {
  Skill.find()
    .then((skills) => {
      res.send(skills);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skills.",
      });
    });
};

exports.findOne = (req, res) => {
  Skill.findById(req.params.skillId)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }

      res.send(skill);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving skill with id " + req.params.skillId,
      });
    });
};

// Update a skill identified by the skillId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username) {
    return res.status(400).send({
      message: "Skill content cannot be empty",
    });
  }

  // Find skill and update it with the request body
  Skill.findByIdAndUpdate(
    req.params.skillId,
    {
      username: req.body.username || "Untitled skill",
      skill: req.body.skill,
    },
    { new: true }
  )
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }
      res.send(skill);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }
      return res.status(500).send({
        message: "Error updating skill with id " + req.params.skillId,
      });
    });
};

// Delete a skill with the specified skillId in the request
exports.delete = (req, res) => {
  Skill.findByIdAndRemove(req.params.skillId)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }
      res.send({ message: "Skill deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.skillId,
        });
      }
      return res.status(500).send({
        message: "Could not delete skill with id " + req.params.skillId,
      });
    });
};

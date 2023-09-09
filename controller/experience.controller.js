const Experience = require("../model/experience.model.js");
// Create and Save a new experience
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }
  // Create a admin
  const experience = new Experience({
    username: req.body.username || "Untitled Experience",
    domain: req.body.domain,
    YearsOfExperience: req.body.YearsOfExperience,
    description: req.body.description,
    company: req.body.company,
  });
  // Save experience in the database
  experience
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the experience.",
      });
    });
};

// Retrieve and return all experience from the database.
exports.findAll = (req, res) => {
  Experience.find()
    .then((experiences) => {
      res.send(experiences);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving experiences.",
      });
    });
};

// Find a single experience with a experienceId
exports.findOne = (req, res) => {
  Experience.findById(req.params.experienceId)
    .then((experience) => {
      if (!experience) {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      res.send(experience);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving experience with id " + req.params.experienceId,
      });
    });
};

// Update a experience identified by the experienceId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username) {
    return res.status(400).send({
      message: "experience content can not be empty",
    });
  }

  // Find experience and update it with the request body
  Experience.findByIdAndUpdate(
    req.params.experienceId,
    {
      username: req.body.username || "Untitled experience",
      domain: req.body.domain,
      YearsOfExperience: req.body.YearsOfExperience,
      description: req.body.description,
      company: req.body.company,
    },
    { new: true }
  )
    .then((experience) => {
      if (!experience) {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      res.send(experience);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      return res.status(500).send({
        message: "Error updating experience with id " + req.params.experienceId,
      });
    });
};

// Delete a experience with the specified experienceId in the request
exports.delete = (req, res) => {
  Experience.findByIdAndRemove(req.params.experienceId)
    .then((experience) => {
      if (!experience) {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      res.send({ message: "experience deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "experience not found with id " + req.params.experienceId,
        });
      }
      return res.status(500).send({
        message: "Could not delete experience with id " + req.params.experienceId,
      });
    });
};

const Education = require("../model/education.model.js");
// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }
  // Create a admin
  const education = new Education({
    username: req.body.username || "Untitled Education",
    school: req.body.school,
    specialty: req.body.specialty,
    dateOfGraduation: req.body.dateOfGraduation,
  });
  // Save education in the database
  education
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the education.",
      });
    });
};

// Retrieve and return all education from the database.
exports.findAll = (req, res) => {
  Education.find()
    .then((educations) => {
      res.send(educations);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving educations.",
      });
    });
};

// Find a single education with a educationId
exports.findOne = (req, res) => {
  Education.findById(req.params.educationId)
    .then((education) => {
      if (!education) {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      res.send(education);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving education with id " + req.params.educationId,
      });
    });
};

// Update a education identified by the educationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username) {
    return res.status(400).send({
      message: "education content can not be empty",
    });
  }

  // Find education and update it with the request body
  Education.findByIdAndUpdate(
    req.params.educationId,
    {
      username: req.body.username || "Untitled education",
      school: req.body.school,
      specialty: req.body.specialty,
      dateOfGraduation: req.body.dateOfGraduation,
    },
    { new: true }
  )
    .then((education) => {
      if (!education) {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      res.send(education);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      return res.status(500).send({
        message: "Error updating education with id " + req.params.educationId,
      });
    });
};

// Delete a education with the specified educationId in the request
exports.delete = (req, res) => {
  Education.findByIdAndRemove(req.params.educationId)
    .then((education) => {
      if (!education) {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      res.send({ message: "education deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "education not found with id " + req.params.educationId,
        });
      }
      return res.status(500).send({
        message: "Could not delete education with id " + req.params.educationId,
      });
    });
};

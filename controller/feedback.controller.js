const Feedback = require("../model/feedback.model.js");
// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }
  // Create a admin
  const feedback = new Feedback({
    username: req.body.username || "Untitled Feedback",
    feedback: req.body.feedback,
    
  });
  // Save feedback in the database
  feedback
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the feedback.",
      });
    });
};

// Retrieve and return all feedback from the database.
exports.findAll = (req, res) => {
  Feedback.find()
    .then((feedbacks) => {
      res.send(feedbacks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving feedbacks.",
      });
    });
};

// Find a single feedback with a feedbackId
exports.findOne = (req, res) => {
  Feedback.findById(req.params.feedbackId)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      res.send(feedback);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving feedback with id " + req.params.feedbackId,
      });
    });
};

// Update a feedback identified by the feedbackId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username) {
    return res.status(400).send({
      message: "feedback content can not be empty",
    });
  }

  // Find feedback and update it with the request body
  Feedback.findByIdAndUpdate(
    req.params.feedbackId,
    {
      username: req.body.username || "Untitled feedback",
      feedback: req.body.feedback,
     
    },
    { new: true }
  )
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      res.send(feedback);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      return res.status(500).send({
        message: "Error updating feedback with id " + req.params.feedbackId,
      });
    });
};

// Delete a feedback with the specified feedbackId in the request
exports.delete = (req, res) => {
  Feedback.findByIdAndRemove(req.params.feedbackId)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      res.send({ message: "feedback deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      return res.status(500).send({
        message: "Could not delete feedback with id " + req.params.feedbackId,
      });
    });
};

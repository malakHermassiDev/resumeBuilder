module.exports = (app) => {
    const feedbacks = require('../controller/feedback.controller');


    app.post('/feedbacks', feedbacks.create);

    
    app.get('/feedbacks', feedbacks.findAll);

   
    app.get('/feedbacks/:feedbackId', feedbacks.findOne);

    
    app.put('/feedbacks/:feedbackId', feedbacks.update);

    
    app.delete('/feedbacks/:feedbackId', feedbacks.delete);
}

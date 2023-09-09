module.exports = (app) => {
    const educations = require('../controller/education.controller');


    app.post('/educations', educations.create);

    
    app.get('/educations', educations.findAll);

   
    app.get('/educations/:educationId', educations.findOne);

    
    app.put('/educations/:educationId', educations.update);

    
    app.delete('/educations/:educationId', educations.delete);
}

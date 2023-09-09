module.exports = (app) => {
    const skills = require('../controller/skills.controller');


    app.post('/skills', skills.create);

    
    app.get('/skills', skills.findAll);

   
    app.get('/skills/:skillId', skills.findOne);

    
    app.put('/skills/:skillId', skills.update);

    
    app.delete('/skills/:skillId', skills.delete);
}

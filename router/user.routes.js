module.exports = (app) =>{
    const users = require('../controller/user.controller')
    //create -> post
    app.post("/users" , users.create)
    //find -> get
    app.get('/users' , users.findAll)
    app.get('/users/:clientId' , users.findOne)
    //update -> put
    app.put('/users/:clientId' , users.update)
    // delete -> delete
    app.delete('/users/:clientId' , users.remove)
    app.post('/login' , users.login)
    app.get('/logout' , users.logout)
}
//lien : https://www.google.com/home
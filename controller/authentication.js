const Client  = require('../model/user.model')
const bcrypt = require('bcryptjs')
exports.register = (req , res)=>{
    //validation to the request
    if(!req.body.email || !req.body.password){
        return res.status(400).send({
            message : "Email and password are required"
        })
    }
    //check if there is another user signed Up with this email
    Client.findOne({email : req.body.email} , (error , excistingClient)=>{
        if(error){
            return res.status(500).json({ message : "we have server Error "})
        }
        if(excistingClient){
            return res.status(400).json({ message : "This Email is already used "})
        }
        bcrypt.genSalt(10 , (error , salt)=>{
            if(error){
                return res.status(500).json({ message : "we have server Error"})
            }
            bcrypt.hash(req.body.password , salt , (error , hash)=>{
                if(error){
                    return res.status(500).json({ message : "we have server Error"})
                }
                const client = new Client({
                    FName: req.body.FName,
                    Lname: req.body.Lname ,
                    email: req.body.email, 
                    phone: req.body.phone , 
                    password: hash ,
                })
                client
                .save()
                .then((data)=>{
                    res.send(data)
                })
                .catch((error)=>{
                    res.status(500).send({
                        message: error.message || "error in the server side"
                    })
                })
            })
        })
    })
}
//LEVEL 10 
// hashing 
//step 1 : generate 'salt value'
//password :azerty
//step 1 : QSDFGHkeghzjklqmz'(§èà123456)4567
//login
exports.login = ( req, res)=>{
    const {email , password} = req.body
    // findOne
    Client.findOne({email} , (error , user)=>{
        if(error){
            return res.status(500).json({message : 'error in the server side'})
        }
        if(!user){
            return res.status(404).json({message : 'user is not found'})
        }
        bcrypt.compare(password , user.password , (error , isMatch)=>{
            if(error){
                return res.status(500).json({message : 'error in the server side'})
            }
            if(isMatch){
                return res.status(200).json({message : "successfully logged In"})
            }
            else{
                return res.status(401).json({message : "failed logged In"})
            }
        })
    })      
}
//logout
//session
exports.logout = (req , res) =>{
    req.session.user = null ; 
    req.session.isAuthenticated = false;
    res.redirect('/') ; 
    return res.status(200).json({message : "Successful Logout"})

}
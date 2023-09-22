const Client = require('../model/user.model');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    try {
        // Validation of the request body fields
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        
        // Check if there is another user signed Up with this email
        const existingClient = await Client.findOne({ email: req.body.email });
        if (existingClient) {
            return res.status(400).json({ message: "This Email is already used" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const client = new Client({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hash,
        });

        const data = await client.save();

        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error in the server side"
        });
    }
};
//login

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User is not found' });
        }

        // Compare the provided plaintext password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
// password: azerty123
// hashed : qsdfghjklm:=dfghjkl:1234567OWXDFGHNJKL
        if (isMatch) {
            return res.status(200).json({ message: 'Successfully logged in' });
        } else {
            return res.status(401).json({ message: 'Failed to log in' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in the server side' });
    }
};


//logout
//session
exports.logout = (req , res) =>{
    req.session.user = null ; 
    req.session.isAuthenticated = false;
    res.redirect('/') ; 
    return res.status(200).json({message : "Successful Logout"})

}

//find()
exports.findAll = (req , res)=>{
Client.find()
.then((clients)=>{
    res.send(clients)
    // res.send(clients) => we send all the clients to the frontend(client side)
})
.catch((error)=>{
    res.status(500).send({
        message: error.message || "error in the server side"
    })
})
}
//findById (req.params)
exports.findOne = (req, res)=>{
Client.findById(req.params.clientId)
.then((client)=>{
    if(!client){
        return res.status(404).send({
            message: "we didn't found the desired client with id " + req.params.clientId
        })
    }
    res.send(client)
})
.catch((error)=>{
    res.status(500).send({
        message: error.message || "error in the server side"
    })
})
}
//update
//findByIdAndUpdate
exports.update= (req , res) =>{
Client.findByIdAndUpdate(
    req.params.clientId, 
    {
        name: req.body.name,
        email: req.body.email, 
        password:req.body.password , 
    }, 
    {new : true}
)
.then((client)=>{
    if(!client){
        return res.status(404).send({
            message: "we didn't found the desired client with id " + req.params.clientId
        })
    }
    res.send(client)
})
.catch((error)=>{
    res.status(500).send({
        message: error.message || "error in the server side"
    })
})
}
//findByIdAndDelete
exports.remove = (req , res)=>(
Client.findByIdAndRemove(req.params.clientId)
.then((client)=>{
    if(!client){
        return res.status(404).send({
            message: "we didn't found the desired client with id " + req.params.clientId
        })
    }
    res.send(client)
})
.catch((error)=>{
    res.status(500).send({
        message: error.message || "error in the server side"
    })
})
)
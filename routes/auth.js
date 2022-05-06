const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require("../validation");

// //Validação com JOI
// const Joi = require('@hapi/joi');

// const userValidation = Joi.object({
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// });

router.post("/register", async (req, res) => {
    //aqui efetuamos a validação dos dados enviados
    //const validation = Joi.validate(req.body, userValidation);
    const { error } = registerValidation(req.body);
    

    if(error){
        return res.status(400).send(error);
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    
});

module.exports = router;
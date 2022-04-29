const router = require('express').Router();
const User = require('../model/User');

//Validação com JOI
const Joi = require('@hapi/joi');

const userValidation = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

router.post("/register", async (req, res) => {
    //aqui efetuamos a validação dos dados enviados
    //const validation = Joi.validate(req.body, userValidation);
    const { error } = userValidation.validate(req.body);

    if(error) return res.status(501).send("error");
    //console.log(userValidate);
    res.status(500).json({
        data: error.details[0].message
    });

    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // try{
    //     const savedUser = await user.save();
    //     res.status(200).send(savedUser);
    // }catch(err){
    //     res.status(400).send(err);
    // }
});

router.post("/login", async (req, res) => {
    
});

module.exports = router;
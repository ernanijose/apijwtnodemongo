const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
    //aqui efetuamos a validação dos dados enviados
    //const validation = Joi.validate(req.body, userValidation);
    const { error } = registerValidation(req.body);
    

    if(error){
        return res.status(400).send(error);
    }

    //verificando se o e-mail existe no banco de dados
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if(emailExists) return res.status(400).send("Este e-mail está cadastrado, tente outro e-mail");


    //Criando um novo usuário
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
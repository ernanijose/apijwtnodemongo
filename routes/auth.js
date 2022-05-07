const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

    //Hash senhas
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Criando um novo usuário
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        //res.status(200).send(savedUser);
        res.status(200).send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});


//Rota de login
router.post("/login", async (req, res) => {
    //aqui efetuamos a validação dos dados enviados    
    const { error } = loginValidation(req.body);

    if(error){
        return res.status(400).send(error);
    }

    //verificando se o e-mail existe no banco de dados
    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) return res.status(400).send("E-mail ou senha está errado!");

    //agora e o e-mail e senha estiverem corretos
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send("A senha está incorreta!");

    //Criando e assinando token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    //res.status(200).send("Sucesso!, Login efetuado.");

});

module.exports = router;
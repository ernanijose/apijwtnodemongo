//Validação com JOI
const Joi = require('@hapi/joi');


//validação do registro
const registerValidation = data => {
    const userValidation = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    //aqui efetuamos a validação dos dados enviados
    //const validation = Joi.validate(req.body, userValidation);
    return userValidation.validate(data);
}

//validação do login
const loginValidation = data => {
    const userValidation = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    //aqui efetuamos a validação dos dados enviados
    //const validation = Joi.validate(req.body, userValidation);
    return userValidation.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

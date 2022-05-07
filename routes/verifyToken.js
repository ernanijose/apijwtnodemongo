const jwt = require('jsonwebtoken');

module.exports = function(req, res, next)
{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Acesso não autorizado!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //Aqui crio a variavem user, coloco no req e envio para a proxima requisicao com os dados do usuario
        req.user = verified;

        next();
    }catch(err){
        res.status(400).send('Token inválido!');
    }
}
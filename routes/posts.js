const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
    //console.log(req);
    const userModel = await User.findOne({
        _id: req.user._id
    });
    res.json({
        user: req.user,
        posts: {'titulo': 'Titulo 1', descricao: 'Descricao do titulo'},
        userModel: userModel
    });
});

module.exports = router;
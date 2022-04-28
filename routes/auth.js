const res = require('express/lib/response');

const router = require('express').Router();

router.post("/register", (req, res) => {
    res.send("Register");
});

router.post("/login", () => {

});

module.exports = router;
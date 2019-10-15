const express = require('express');
const router  = express.Router();

const jwt      = require('jsonwebtoken');
const passport = require('passport');
const UserModel = require('../models/user')

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, isSuccess, user) => {
        if (err || !isSuccess) {
            return res.status(400).json({
                message: user? "Incorrect username or password": "Login faild",
                user   : null
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, 'duyhau_jwt');
            console.log(token);
            return res.json({user, token});
        });
    })
    (req, res);

});

router.post('/register', function (req, res, next) {
        UserModel.add(req.body).then(user =>{
            return res.json({user});
        })
        .catch(err=>{
            console.log(err);
            return res.json({message: "Cannot Register!!!"});
        });
});

module.exports = router;
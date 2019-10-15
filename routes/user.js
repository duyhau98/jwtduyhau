
var express = require('express');
var router = express.Router();
const passport = require('passport');
const UserModel = require('../models/user')

/* GET user profile. */
router.get('/', function(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, isSuccess, user) => {
        if(isSuccess) {
            UserModel.single(user.id).then( userr => {
                if(userr.length>0) {
                    return res.json(userr);
                } else {
                    return res.json({message: "Tài khoản không tồn tại"});
                }
            })
        } else {
            return null;
        }
    })
    (req, res);
});

module.exports = router;
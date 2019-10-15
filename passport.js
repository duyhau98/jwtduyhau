const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

const UserModel = require('./models/user')

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        return UserModel.singleByUserNamePassword(username,password).then(user=>{
            console.log(JSON.stringify(user[0]));
            if(user.length==0) {
                return  cb(null, false, JSON.stringify(user[0]));
            } else {
                
                return cb(null, true, JSON.stringify(user[0]));
            }
        })
        .catch(err => {
            console.log(err);
            return cb(err);
        });
    }
));
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'duyhau_jwt'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        return cb(null, true, jwtPayload);
    }
));
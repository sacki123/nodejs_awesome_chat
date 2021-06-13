import passport, { use } from "passport";
import passportLocal  from "passport-local";
import UserModel from "../../model/userModel";
import {transErrors, transSuccess} from "../../../lang/vi"

let LocalStrategy = passportLocal.Strategy;

//Valid user account type: local

let initPassportLocal = () =>{
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done)=>{
        try {
            let user = await UserModel.findByEmail(email);
            if (!user){
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }
            if (!user.local.isActive){
                return done(null, false, req.flash("errors", transErrors.account_actived));
            } 
            
            let checkPassword = await user.comparePassword(password);
            if (!checkPassword){
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }
            return done(null,user,req.flash("success", transSuccess.loginSuccess(user.username)))
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));

    //Save user into sesion
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })
    //Save user into variable(req.user)
    passport.deserializeUser((id, done)=>{
        UserModel.findUserById(id)
        .then((user)=>{
            return done(null, user);
        })
        .catch((error)=>{
            return done(error, null);
        })
    })
}

module.exports = initPassportLocal;
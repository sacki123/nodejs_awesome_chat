import { fromCallback } from "bluebird";
import express from "express";
import {home, auth, user} from "../controllers/index";
import {authvalid} from "./../validation/index";
import initPassportLocal from "../controllers/passportControler/local";
import initPassportFacebook from "../controllers/passportControler/facebook";
import initPassportGoogle from "../controllers/passportControler/google";
import passport, { use } from "passport";

//init All Passport

initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

/**
 * init Router
 * @param app
 * 
 */
let initRoutes = (app)=>{
    router.get("/", auth.checkLoggedIn, home.getHome);//getHome là tạo riêng một cái controler xử lý riêng
    router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);//getLoginRegister là tạo riêng một cái controler xử lý riêng
    router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount); //xử lý verify
    router.post("/register",auth.checkLoggedOut, authvalid.register, auth.posRegister);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/auth/facebook", auth.checkLoggedOut, passport.authenticate("facebook", {scope: ["email"]}));
    router.get("/auth/facebook/callback", auth.checkLoggedOut, passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login-register"
    }));

    router.get("/auth/google", auth.checkLoggedOut, passport.authenticate("google", {scope: ["email"]}));
    router.get("/auth/google/callback", auth.checkLoggedOut, passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login-register"
    }));
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    router.put("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar)
    return app.use("/", router);//cho app sử dụng cái router
};

module.exports = initRoutes;

import { fromCallback } from "bluebird";
import express from "express";
import {home, auth} from "../controllers/index";
import {authvalid} from "./../validation/index";
import initPassportLocal from "../controllers/passportControler/local";
import passport from "passport";

//init All Passport
initPassportLocal();

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
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    return app.use("/", router);//cho app sử dụng cái router
};

module.exports = initRoutes;

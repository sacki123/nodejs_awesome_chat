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
    router.get("/", home.getHome);//getHome là tạo riêng một cái controler xử lý riêng
    router.get("/login-register", auth.getLoginRegister);//getLoginRegister là tạo riêng một cái controler xử lý riêng
    router.get("/verify/:token", auth.verifyAccount); //xử lý verify
    router.post("/register",authvalid.register, auth.posRegister);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
    }));

    return app.use("/", router);//cho app sử dụng cái router
};

module.exports = initRoutes;

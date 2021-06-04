import { fromCallback } from "bluebird";
import express from "express";
import {home, auth} from "../controllers/index";
import {authvalid} from "./../validation/index"
let router = express.Router();

/**
 * init Router
 * @param app
 * 
 */
let initRoutes = (app)=>{
    router.get("/", home.getHome);//getHome là tạo riêng một cái controler xử lý riêng
    router.get("/login-register", auth.getLoginRegister);//getLoginRegister là tạo riêng một cái controler xử lý riêng
    router.post("/register",authvalid.register, auth.posRegister)
    
    return app.use("/", router);//cho app sử dụng cái router
};

module.exports = initRoutes;

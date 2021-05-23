import express from "express";
import getLoginRegister from "../controllers/authcontroller";
import getHome from "../controllers/homeController";
let router = express.Router();

/**
 * init Router
 * @param app
 * 
 */
let initRoutes = (app)=>{
    router.get("/", getHome);
    router.get("/login-register", getLoginRegister);
    return app.use("/", router);
};

module.exports = initRoutes;

















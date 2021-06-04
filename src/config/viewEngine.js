import express from "express";
import expressEjsExtend from "express-ejs-extend";
//Cau hinh view engine
let configViewEngine = (app)=>{
    app.use(express.static("./src/public")); // khai bao thu muc chua file js,css
    app.engine("ejs", expressEjsExtend); 
    app.set("view engine","ejs"); //set view engine la ejs
    app.set("views","./src/views"); //chi dinh duong dan den thu muc chua file ejs
};
module.exports = configViewEngine;
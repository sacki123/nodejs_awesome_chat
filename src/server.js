// import { try } from 'bluebird';
import express from "express";
import connectDB from "./config/connectDB";
// //import ContactSchema from "./model/contact.model"
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session"
import passport from "passport"
// const express = require('express');
//init App
let app = express();

/**Connect to MongoDB */
connectDB();
configSession(app);
//config view engine
configViewEngine(app);

/**
 * Enable post data request
 */
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Enable Flash message
 */
app.use(connectFlash());


/**
 * Config Passport
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Router
 */
 initRoutes(app);

// // app.get("/testdb",async (req,res)=> {
// //     try {
// //         let item = {
// //             userId: "456",
// //             contactId: "id789",
// //         }
// //         let contact = await ContactSchema.createNew(item);  
// //         res.send(contact);
// //     } catch (error) {
// //         res.send(error);
// //     }
    
// // });

// // app.listen(process.env.port, process.env.hostname, () => {
// //     console.log(`Hello hoangnm7 ${process.env.hostname}:${process.env.port}/`)
// // });
app.get("/helloworld",(req,res)=> {
    res.send("<h1> Hello world !!!</h1>");
});
app.get("/",(req,res)=> {
    res.send("<h1> Hello nonono!!!</h1>");
});
app.get("/hoang",(req,res)=> {
    res.send("<h4> Chao anh Hoang</h4>");
});

app.listen(process.env.PORT,() => {
    console.log(`Hello hoangnm7 ${process.env.HOST}:${process.env.PORT}/`)
});
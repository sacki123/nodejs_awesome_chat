// var express = require('express');
// import { try } from 'bluebird';
import express from 'express';
import connectDB from "./config/connectDB";
//import ContactSchema from "./model/contact.model"
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
//init App
var app = express();

/**Connect to MongoDB */
connectDB();

//config view engine
configViewEngine(app);

/**
 * Router
 */
 initRoutes();

// app.get("/testdb",async (req,res)=> {
//     try {
//         let item = {
//             userId: "456",
//             contactId: "id789",
//         }
//         let contact = await ContactSchema.createNew(item);  
//         res.send(contact);
//     } catch (error) {
//         res.send(error);
//     }
    
// });

// app.listen(process.env.port, process.env.hostname, () => {
//     console.log(`Hello hoangnm7 ${process.env.hostname}:${process.env.port}/`)
// });
// app.get("/helloworld",(req,res)=> {
//     res.send("<h1> Hello world !!!</h1>");
// });
app.listen(process.env.port, process.env.hostname, () => {
    console.log(`Hello hoangnm7 ${process.env.hostname}:${process.env.port}/`)
});
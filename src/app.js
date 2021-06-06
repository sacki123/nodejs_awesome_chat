express = require("express");


// import express from "express";
var app = express();
const PORT = 8020;
const HOST = 'localhost'; 
app.get("/helloworld",(req,res)=> {
        res.send("<h1> Hello world !!!</h1>");
    });
app.get("/",(req,res)=> {
    res.send("<h1> Home !!!</h1>");
});    
  
app.listen(PORT, HOST, () => {
    console.log(`Hello hoangnm7 ${PORT}:${HOST}/`)
});

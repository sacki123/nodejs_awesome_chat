// var express = require('express');
import express from 'express';

var app = express();

var hostname = "localhost";
var port = 8020;
app.get("/helloworld",(req,res)=> {
    res.send("<h1> Hello world !!!</h1>");
});

app.listen(port, hostname, () => {
    console.log(`Hello hoangnm7 ${hostname}:${port}/`)
})
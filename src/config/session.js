import session from "express-session";
import connectMongo from "connect-mongo";
import { cookie } from "express-validator/check";

let mongoStore = connectMongo(session);
/**
 * Cấu hình store để lưu trữ sesion
 */
let sessionStore = new mongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect: true,
    autoRemove: "native"
});
/**
 * Cấu hình session
 * @param {app} app 
 */
let configSession = (app)=>{
    app.use(session({
        key: "express.sid",
        secret: "mySecret", //sigin Session ID
        store: sessionStore, //Nơi lưu session
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24 //thời gian tồn tại session
        }
    }))
};
module.exports = configSession;
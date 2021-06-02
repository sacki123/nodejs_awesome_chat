import mongoose from "mongoose";
import bluebird from "bluebird"

/**
 * Connect to Db
 */

let connectDB = ()=>{
    mongoose.Promise = bluebird
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose.connect(URI, {userMongoClient: true});
}
module.exports = connectDB;
import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type:Number, default: null},
    address: {type:String, default:null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type:String, default: "user"},
    local: {
        email: {type:String, trim:true},
        password: String,
        isActive: {type:Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid :String,
        token: String,
        email: {type:String, trim:true}
    },
    google: {
        uid :String,
        token: String,
        email: {type:String, trim:true}
    },
    createdAt: {type:Number, default: Date.now},
    updatedAt: {type:Number, default: null},
    deleteAt: {type:Number, default: null},
});
 UserSchema.statics = {
    createNew(item){
        return this.create(item);
     },

    findByEmail(email){
        return this.findOne({"local.email": email}).exec();
    },

    removeById(id){
        return this.findByIdAndRemove(id).exec();
    },
    //Tìm kiếm Token
    findByToken(token){
        return this.findOne({"local.verifyToken": token}).exec();
    },
    
    //Kiểm tra token đã được actived ?
    verify(token){
        return this.findOneAndUpdate(
            {"local.verifyToken": token},
            {"local.isActive": true, "local.verifyToken": null}
        ).exec();
    },
    
    findUserById(id){
        return this.findById(id).exec();
    }
 };

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password); //return promise true or false
    }
} 
module.exports = mongoose.model("user", UserSchema);

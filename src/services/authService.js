import UserModel from "../model/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transErrors, transSuccess, transMail} from "../../lang/vi";
import sendMail from "../config/mailer";
let saltRounds = 7;
let register = (email, gender, password, protocol, host)=>{
    return new Promise(async (resolve, reject)=>{
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail){
            if (userByEmail.deleteAt != null) {
                return reject(transErrors.account_removed);
            }
            if (!userByEmail.local.isActive) {
                return reject(transErrors.account_actived);
            }
            return reject(transErrors.account_in_use);
        }
        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local:{
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        let user = await UserModel.createNew(userItem);
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
        // send email
        sendMail(email, transMail.subject, transMail.template(linkVerify))
        .then(() =>{
            resolve(transSuccess.account_create_success.userCreated(user));
        })
        .catch(async (error)=>{
            //remove user
            await UserModel.removeById(user._id);
            console.log(error);
            reject(transMail.send_failed);
        });
        })
        //send mail pattern 2
        // try{
        //     await sendMail(email, transMail.subject, transMail.template(linkVerify))
        //         resolve(transSuccess.account_create_success.userCreated(user));
        //     }
        //     catch(error){
        //         //remove user
        //         await UserModel.removeById(user._id);
        //         console.log(error);
        //         reject(transMail.send_failed);
        //     };
};

let verifyAccount = (token)=>{
    return new Promise(async (resolve, reject)=> {
        let userByToken = await UserModel.findByToken(token);
        if (!userByToken){
            reject(transErrors.token_undefined)
        }
        await UserModel.verify(token);
        resolve(transSuccess.account_actived);
    })
}
module.exports = {
    register:register,
    verifyAccount: verifyAccount
}; 
import {validationResult} from "express-validator/check";
import {auth} from "../services/index"
let getLoginRegister = (req, res)=>{
    return res.render("auth/master",{
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};
let posRegister = async (req, res) =>{
    let errorsArr = [];
    let successArr = [];
    let validResult = validationResult(req);
    if (!validResult.isEmpty()){
        let result = Object.values(validResult.mapped()); //Lấy values của object rồi đưa vào 1 mảng (giống dictionary.values())
        result.forEach((item)=>{
            errorsArr.push(item.msg);
        })
        req.flash("errors", errorsArr);
        return res.redirect("/login-register");
    }
    try {
        let createSuccess = await auth.register(req.body.email,req.body.gender, req.body.password, req.protocol, req.get("host"))
        successArr.push(createSuccess);
        req.flash("success", successArr);
        return res.redirect("/login-register");
    } catch (error) {
        errorsArr.push(error);
        req.flash("errors", errorsArr);
        return res.redirect("/login-register");
    }
} ;

let verifyAccount = async (req,res)=>{
    let errorArr = [];
    let successArr = [];
    try {
        let verifySuccess = await auth.verifyAccount(req.params.token);
        successArr.push(verifySuccess);
        req.flash("success", successArr);
        return res.redirect("/login-register")
    } catch (error) {
        errorArr.push(error);
        req.flash("errors", errorArr);
        return res.redirect("/login-register");
    }
}
module.exports = {
    getLoginRegister: getLoginRegister,
    posRegister: posRegister,
    verifyAccount: verifyAccount
};
import {validationResult} from "express-validator/check";

let getLoginRegister = (req, res)=>{
    return res.render("auth/master",{
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};
let posRegister = (req, res) =>{
    let validResult = validationResult(req);
    if (!validResult.isEmpty()){
        let errors = [];
        let result = Object.values(validResult.mapped()); //Lấy values của object rồi đưa vào 1 mảng (giống dictionary.values())
        result.forEach((item)=>{
            errors.push(item.msg);
        })
        req.flash("errors", errors);
        return res.redirect("/login-register");
    }
    console.log("Khong loi");
} ;
module.exports = {
    getLoginRegister: getLoginRegister,
    posRegister: posRegister
};
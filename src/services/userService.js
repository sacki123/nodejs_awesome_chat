import UserModel from "./../model/userModel"

let updateUser = (id, item)=>{
    return UserModel.updateUser(id, item);
}
module.exports = {
    updateUser: updateUser
}
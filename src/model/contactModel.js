import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    gender: {type: Boolean, default: false},
    status: {type:Number, default: null},
    createdAt: {type:Number, default: Date.now},
    updatedAt: {type:Number, default: null},
    deleteAt: {type:Number, default: null}
});
ContactSchema.statics = {
    createNew(item){
        return this.create(item);
    }
};

module.exports = mongoose.model("contact",ContactSchema);
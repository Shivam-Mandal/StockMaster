import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
      },
    contact:{type:Number,required:true},
    address:{type:String,required:true},
    isActive:true,
    lastActive:{
        type:Date,
        default:Date.now
    }

})

export default Store = mongoose.model('Store',storeSchema);
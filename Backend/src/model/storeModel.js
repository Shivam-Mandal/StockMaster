import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    contact:{type:Number,required:true},
    location:{type:String,required:true}
})

export default Store = mongoose.model('Store',storeSchema);
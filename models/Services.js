import mongoose from "mongoose";
const ServicesSchema = new mongoose.Schema({
    
    name:{
        type:String,
        requried:true,
    },
    price:{
        type:String,
        requried:true,
    },
    description:{
        type:String,
        
    },
},
{
    timestamps:true,
},);

export default mongoose.model('Services', ServicesSchema);
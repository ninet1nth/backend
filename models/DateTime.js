import mongoose from "mongoose";
const DateTimeSchema = new mongoose.Schema({
    
    
    date:{
        type:String,
        requried:true,
        
    },
    time:{
        type:String,
        requried:true,
        
    },
    
},
{
    timestamps:true,
},);

export default mongoose.model('DateTime', DateTimeSchema, 'dateRecording');
import mongoose from "mongoose";
const DateRecordingSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        requried:true,
    },
    serviceName:{
        type:String,
        requried:true,
    },
    price:{
        type:String,
        requried:true,
    },
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

export default mongoose.model('DateRecording', DateRecordingSchema, 'dateRecording');

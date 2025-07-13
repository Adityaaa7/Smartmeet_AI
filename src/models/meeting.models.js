import mongoose,{ Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        uploaded_by:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        title:{
            type:String,
            required:true
        },
        transcriptionURL:{
            type:String,
            default:"",
            required:true
        },
        summaryId:{
            type:Schema.Types.ObjectId,
            ref:"Summary",
            required:true
        }
    },
    {timestamps:true})

export const Meeting = mongoose.model("Meeting",meetingSchema)
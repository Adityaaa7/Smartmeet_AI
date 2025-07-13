import mongoose,{ Schema } from "mongoose";

const summarySchema  = new Schema(
    {
        meeting_id:{
            type:Schema.Types.ObjectId,
            ref:"Meeting",
            required:true
        },
        overAllSummary:{
            type:String,
            required:true
        },
        roleWiseSummary:{
            type: Map,
            of: String
        },
        keywords: {
            type: [String], // (Optional for now, can be extracted later)
            default: []
          }
    },
    {timestamps:true})


export const Summary = mongoose.model("Summary",summarySchema)
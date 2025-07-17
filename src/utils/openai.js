import { APIError, OpenAI } from "openai"
import { Summary } from "../models/summary.models"

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})


export const summarizeText = async(text) =>{
    try{
        const complition = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages: [
                {
                    role:"system",
                    content:"You're an AI assistant that summarizes meeting transcripts. Return only a clear summary."
                },
                {
                    role:"user",
                    content: `Summarize this meeting transcript:\n\n${text}`
                }
            ],
            temperature:0.3,
            max_tokens: 600
        })

        const summary = complition.choices[0].message.content
        return { summary }
    }
    catch(err){
        return {summary : null}
    }
}
import express from 'express';
import * as dotenv from 'dotenv';
import {  OpenAI } from 'openai';

//so we could access secretive .env file 
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: "hello from DALL.E ROUTES" })
})

//we need a new route to pass prompt from frontend to openai
//and then send back the generated image as json obj
router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;

        const response = await openai.createImage({
            
            prompt,
            n:1,
            size: "1024x1024",
            response_format: 'b64_json'
        });
        
        const image = response.data.data[0].b64_json;
        //sent back to the front end as json object
        res.status(200).json({ photo: image });

    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;
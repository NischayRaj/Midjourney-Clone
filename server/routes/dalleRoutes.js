import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });


  router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        // Check if aiResponse or its data property is undefined
        if (aiResponse && aiResponse.data && aiResponse.data.length > 0) {
            const image = aiResponse.data[0].b64_json;
            res.status(200).json({ photo: image });
        } else {
            // Handle the case where aiResponse or its data is undefined
            res.status(500).json({ error: 'No data received from the AI model' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error?.response?.data?.error?.message || 'Something went wrong' });
    }
});
    
    export default router;

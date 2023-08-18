import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());


const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-AHIUE2oiagZjyIJy3wE6HAsC',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', async (req: Request, res: Response) => {
  console.log('hi from get req')
  const message = 'Hello World From the Typescript Server!'
  res.json(message)
});

app.get('/models', async (req, res) => {
  const response = await openai.listModels();
  //console.log('response', response.data.data);
  res.json(response.data.data);
});

app.post('/image', async (req, res) => {
try {
  const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;
  res.json(image_url)
  
} catch (error) {
  console.log('error with getting image post request', error)
  res.send(error)
  
}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

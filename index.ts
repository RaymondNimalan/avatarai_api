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
  console.log('response', response.data.data);

  res.json(response.data.data);
});

app.post('/image', async (req, res) => {
try {
  const {prompt, size} = req.body
  const response = {
    "status": 200,
    "statusText": "OK",
    "headers": {
      "date": "Mon, 21 Aug 2023 23:30:08 GMT",
      "content-type": "application/json",
      "content-length": "549",
      "connection": "close",
      "openai-version": "2020-10-01",
      "openai-organization": "user-riyoevilmhiwnfsfgxwx9tfn",
      "x-request-id": "963fdf69e5704e4f3a79cecce83206d9",
      "openai-processing-ms": "6563",
      "access-control-allow-origin": "*",
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "cf-cache-status": "DYNAMIC",
      "server": "cloudflare",
      "cf-ray": "7fa6a95ade595968-IAD",
      "alt-svc": "h3=\":443\"; ma=86400"
    },
    "config": {
      "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
      },
      "adapter": "[Function: httpAdapter]",
      "transformRequest": "[ [Function: transformRequest] ]",
      "transformResponse": "[ [Function: transformResponse] ]",
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1,
      "validateStatus": "[Function: validateStatus]",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "User-Agent": "OpenAI/NodeJS/3.3.0",
        "Authorization": "Bearer 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",
        "OpenAI-Organization": "org-AHIUE2oiagZjyIJy3wE6HAsC",
        "Content-Length": 55
      },
      "method": "post",
      "data": "{\"prompt\":\"a white siamese cat\",\"n\":1,\"size\":\"256x256\"}",
      "url": "https://api.openai.com/v1/images/generations"
    },
    "request": {},
    "data": {
      "created": 1692660608,
      "data": [{url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-AHIUE2oiagZjyIJy3wE6HAsC/user-riYOeVilmHIWNFsFGxWx9tFn/img-GoQJpvx8IllPpuUA3p1PhE5r.png?st=2023-08-21T23%3A20%3A25Z&se=2023-08-22T01%3A20%3A25Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-21T20%3A10%3A00Z&ske=2023-08-22T20%3A10%3A00Z&sks=b&skv=2021-08-06&sig=ya8e16M5RBYn71Dy4UrOUIgWf1raFd4%2BhAkWV3WSY9c%3D'}]
    }
  }  
  // const response = await openai.createImage({
  //   // prompt: "a white siamese cat",
  //   // n: 1,
  //   // size: "1024x1024",
  //   prompt: `${prompt}`,
  //   n: 1,
  //   size: `${size}`,
  // });
  const image_url = response.data.data[0].url;
  console.log('i am response', response)
  console.log('i am data', response.data.data[0])
  console.log('i am image', image_url)
  res.json(image_url)
  
} catch (error) {
  console.log('error with getting image post request', error)
  if (error instanceof Error) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
  
}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

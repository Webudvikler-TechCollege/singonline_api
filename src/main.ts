import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import { songController } from "./controllers/songController.js";
import { artistController } from "./controllers/artistController.js";
import { userController } from "./controllers/userController.js";
import { authController } from "./controllers/authController.js";
import { dataController } from "./controllers/dataController.js";

const app = express()

const allowedOrigins = [
  'https://singonline9520.netlify.app',
  'http://localhost:5173'
]

interface CorsOptions {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
  methods: string[];
  allowedHeaders: string[];
  credentials: boolean;
}

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void {
    // Tillad også Postman og lokale requests uden origin
    console.log('Origin:', origin);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS-fejl: Origin ikke tilladt: ${origin}`), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

/*
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
*/


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
  res.send('Sequelize Example')
})

app.use(dataController);
app.use(songController);
app.use(artistController);
app.use(userController);
app.use(authController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
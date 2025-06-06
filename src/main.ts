import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import { songController } from "./controllers/songController.js";
import { artistController } from "./controllers/artistController.js";
import { userController } from "./controllers/userController.js";
import { dataController } from "./controllers/dataController.js";
import { authController } from "./controllers/authController.js";

const allowedOrigins = [
  'http://localhost:5173', 
  'https://singonline9520.netlify.app'
];

const app = express()

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS-fejl: Origin ikke tilladt: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.json({'message': 'Sequelize Example'})
})

app.use(
  songController,
  artistController,
  userController,
  dataController,
  authController
)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
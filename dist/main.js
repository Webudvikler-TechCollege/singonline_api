import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import { songController } from "./controllers/songController.js";
const allowedOrigins = [
    'http://localhost:5173',
    'https://singonline9520.netlify.app'
];
const app = express();
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS-fejl: Origin ikke tilladt: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ 'message': 'Sequelize Example' });
});
app.use(songController);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

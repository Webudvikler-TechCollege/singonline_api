import "reflect-metadata";
import express from 'express';
import { songController } from "./controllers/songController.js";
import { artistController } from "./controllers/artistController.js";
import { userController } from "./controllers/userController.js";
import { authController } from "./controllers/authController.js";
import { dataController } from "./controllers/dataController.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send('Sequelize Example');
});
app.use(dataController, songController, artistController, userController, authController);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

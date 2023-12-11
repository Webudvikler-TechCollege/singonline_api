import express from "express";
import sequelize from "../Config/sequelize.config.js";
import SeedController from '../Controllers/Seed/seed.controller.js'
import Song from "../Models/song.model.js";
import Album from "../Models/album.model.js";

const router = express.Router();

router.get("/sync", async (req, res) => {
	try {
		await sequelize.sync({ force: true })
		res.sendStatus(200)
	}	
	catch(err) {
		res.send(err)
	}
})

router.get("/seed", async (req, res) => {
	const seeder = new SeedController() 
	try {
		await sequelize.sync({ force: true })
		await seeder.seed_from_csv()
		res.sendStatus(200)
	}
	catch(err) {
		res.send(err)
	}
})

export { router as InitRouter }
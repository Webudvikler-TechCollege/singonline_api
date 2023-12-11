import express from "express";
import SongController from "../Controllers/song.controller.js";
const router = express.Router();
const controller = new SongController();

router.get("/songs", async (req, res) => {
	try {
		res.json(await controller.get_all())
	} catch (error) {
		res.json({message: error.message})
	}
})

router.get("/songs/:id([0-9]*)", async (req, res) => {
	try {
		res.json(await controller.get_single(req.params.id))		
	} catch (error) {
		res.json({message: error.message})
	}
})

router.post("/songs", async (req, res) => {
	try {
		const result = await controller.create(req.body)
		res.json({ message: 'Record created', new_id: result.id })
	} catch (error) {
		res.json({message: error.message})		
	}
})

router.put("/songs", async (req, res) => {
	try {
		await controller.update(req.body)
		res.json({ message: 'Record updated'})		
	} catch (error) {
		res.json({message: error.message})		
	}
})

router.delete("/songs/:id([0-9]*)", async (req, res) => {
	try {
		await controller.delete(req.params.id)
		res.json({ message: 'Record deleted'})				
	} catch (error) {
		res.json({message: error.message})				
	}
	
})
export { router as SongRouter }
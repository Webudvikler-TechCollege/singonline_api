import express from "express";
import SongController from "../Controllers/song.controller.js";
const router = express.Router();
const controller = new SongController();

router.get("/songs", async (req, res) => {
	controller.list(req, res)
})

router.get("/songs/:id([0-9]*)", async (req, res) => {
	controller.details(req, res)
})

router.post("/songs", async (req, res) => {
	controller.create(req, res)
})

router.put("/songs", async (req, res) => {
	controller.update(req, res)
})

router.delete("/songs/:id([0-9]*)", async (req, res) => {
	controller.delete(req, res)
})

export { router as SongRouter }
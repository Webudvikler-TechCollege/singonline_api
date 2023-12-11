import express from "express";
import ArtistController from "../Controllers/artist.controller.js";
const router = express.Router();
const controller = new ArtistController();

router.get("/artists", async (req, res) => {
	controller.list(req, res)
})

router.get("/artists/:id([0-9]*)", async (req, res) => {
	console.log(12121212);
	controller.details(req, res)
})

router.post("/artists", async (req, res) => {
	controller.create(req, res)
})

router.put("/artists", async (req, res) => {
	controller.update(req, res)
})

router.delete("/artists/:id([0-9]*)", async (req, res) => {
	controller.delete(req, res)
})

export { router as ArtistRouter }
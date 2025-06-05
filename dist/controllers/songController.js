import express from "express";
import { Song, Artist } from "../models/index.js";
import { Authorize } from "../utils/authUtils.js";
export const songController = express.Router();
const url = 'songs';
songController.get(`/${url}`, async (req, res) => {
    try {
        const songs = await Song.findAll({
            attributes: ['id', 'title', 'artist_id', 'createdAt'],
            include: {
                model: Artist,
                as: 'artist',
                attributes: ['id', 'name'],
            }
        });
        if (!songs || songs.length === 0) {
            res.status(404).json({ message: "No songs found" });
        }
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching songs: ${error.message}` });
    }
});
songController.get(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid song ID" });
    }
    try {
        const song = await Song.findByPk(id, {
            attributes: ['id', 'title', 'artist_id', 'content', 'createdAt'],
            include: {
                model: Artist,
                as: 'artist',
                attributes: ['id', 'name'],
            }
        });
        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching song: ${error.message}` });
    }
});
songController.post(`/${url}`, Authorize, async (req, res) => {
    console.log(req.body);
    const { title, artist_id, content } = req.body;
    try {
        const newSong = await Song.create({ title, artist_id, content });
        res.status(201).json(newSong);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating song: ${error.message}` });
    }
});
songController.put(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid song ID" });
    }
    const { title, artist_id, content } = req.body;
    try {
        const [updated] = await Song.update({ title, artist_id, content }, { where: { id } });
        if (updated) {
            const updatedSong = await Song.findByPk(id);
            res.status(200).json(updatedSong);
        }
        else {
            res.status(404).json({ message: "Song not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
});
songController.delete(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid song ID" });
    }
    try {
        const deleted = await Song.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Song not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting song: ${error.message}` });
    }
});

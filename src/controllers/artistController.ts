import express from "express";
import type { Request, Response } from "express";
import { Artist } from "../models/index.js";
import { Authorize } from "../utils/authUtils.js";

export const artistController = express.Router();

const url:string = 'artists';

artistController.get(`/${url}`, Authorize, async (req: Request, res: Response) => {
    try {
        const data = await Artist.findAll({
            attributes: ['id', 'name', 'createdAt']
        });
        if (!data || data.length === 0) {
            res.status(404).json({ message: "No artists found" });
        }
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: `Error fetching artists: ${error.message}` });
    }
});

artistController.get(`/${url}/:id`, Authorize, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)) {
        res.status(400).json({ message: "Invalid Artist ID" });
    }
    try {
        const data = await Artist.findByPk(id, 
            {
                attributes: ['id', 'name', 'createdAt'],
            }
        );
        if (!data) {
            res.status(404).json({ message: "Artist not found" });
        }
        res.status(200).json(data);
    }
    catch (error: any) {
        res.status(500).json({ message: `Error fetching Artist: ${error.message}` });
    }
});

artistController.post(`/${url}`, Authorize, async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newData = await Artist.create({ name });
        res.status(201).json(newData);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating Artist: ${error.message}` });
    }
});

artistController.put(`/${url}/:id`, Authorize, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)) {
        res.status(400).json({ message: "Invalid Artist ID" });
    }
    const { name } = req.body;
    try {
        const [updated] = await Artist.update(
            { name },
            { where: { id } }
        );
        if (updated) {
            const updatedArtist = await Artist.findByPk(id);
            res.status(200).json(updatedArtist);
        } else {
            res.status(404).json({ message: "Artist not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: `Error updating Artist: ${error.message}` });
    }
});

artistController.delete(`/${url}/:id`, Authorize, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)) {
        res.status(400).json({ message: "Invalid Artist ID" });
    }
    try {
        const deleted = await Artist.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Artist not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: `Error deleting Artist: ${error.message}` });
    }
});

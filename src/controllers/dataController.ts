import express from "express";
import sequelize from "../config/sequelize.js";
import type { Request, Response } from "express";
import User from "../models/userModel.js";
import Artist from "../models/artistModel.js";
import Song from "../models/songModel.js";
import { seedFromCsv } from "../utils/seedUtils.js";

export const dataController = express.Router();

const url:string = 'users';

// Test database connection
dataController.get('/test', async (req: Request, res: Response) => {	
    try {
        await sequelize.authenticate();
        res.status(200).send({ message: 'Database connection successful'})
    } catch (error: any) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });
    }
});

// Synchronize database tables
dataController.get('/sync', async (req, res) => {
    try {
        const forceSync = req.query.force === 'true';
        await sequelize.sync({ force: forceSync });
        res.status(200).json({ message: `Database synchronized ${forceSync ? 'with force' : 'without force'}` })
    } catch (error: any) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });        
    }
});

// Seed database from CSV files
dataController.get('/seedfromcsv', async (req: Request, res: Response) => {
    try {
        // Array med seed filer og models
        const files_to_seed = [
            { file: 'user.csv', model: User },
            { file: 'artists.csv', model: Artist },
            { file: 'songs.csv', model: Song }
        ]
        // Array til svar
        const files_seeded = []

        // Sync'er database
        await sequelize.sync({ force: true });

        // Looper og seeder filer til modeller
        for(let item of files_to_seed) {
            files_seeded.push(await seedFromCsv(item.file, item.model))	
        }
        res.status(200).json({ message: `Seeding complete! Files seeded: ${files_seeded}` })
    } catch (error: any) {
        res.status(500).json({ message: `Error updating song: ${error.message}` });        
    }
});

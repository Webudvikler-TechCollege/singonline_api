import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';
import { InitRouter } from './Routes/init.router.js'
import { SongRouter } from './Routes/song.router.js'
import { ArtistRouter } from './Routes/artist.router.js'
import { AlbumRouter } from './Routes/album.router.js'

// Deklarerer vars
dotenv.config()
const port = process.env.PORT || 3000
const app = express()

// Udvider app i index.js så vi kan læse form body data
app.use(express.urlencoded({ extended: true }))

// App Settings som sikrer CORS adgang via browser
app.use((req, res, next) => {
	// res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Credentials', true);
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

// App settings som åbner en route til at hente billeder
const currentUrl = import.meta.url;
const currentPath = fileURLToPath(currentUrl);
const currentDir = path.dirname(currentPath);
app.use('/Assets', express.static(path.join(currentDir, 'Assets')));

// Henter routes
app.use(InitRouter, SongRouter, ArtistRouter, AlbumRouter)

// Server 
app.listen(port, () => {
	console.log(`Server kører på http://localhost:${port}`);
})
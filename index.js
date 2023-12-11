import express from 'express'
import dotenv from 'dotenv'
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

// Henter routes
app.use(InitRouter, SongRouter, ArtistRouter, AlbumRouter)

// Server 
app.listen(port, () => {
	console.log(`Server kører på http://localhost:${port}`);
})
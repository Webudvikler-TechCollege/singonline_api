import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Song from '../../Models/song.model.js';
import Artist from '../../Models/artist.model.js';
import Album from '../../Models/album.model.js';
import AlbumSongRel from '../../Models/album_song_rel.model.js';

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('TrashGuide Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
		let data;
		let insert;
	
		try {

			// Artists
			data = await this.get_csv_data('artist.csv')
			insert = await Artist.bulkCreate(data, { transaction });

			// Album
			data = await this.get_csv_data('album.csv')
			insert = await Album.bulkCreate(data, { transaction });

			// Song
			data = await this.get_csv_data('song.csv')
			insert = await Song.bulkCreate(data, { transaction });

			// Album Song Rel
			data = await this.get_csv_data('album_song_rel.csv')
			insert = await AlbumSongRel.bulkCreate(data, { transaction });

			// Confirm transaction
			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				//console.log(row);
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController
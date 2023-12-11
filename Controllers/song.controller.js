import Album from "../Models/album.model.js";
import AlbumSongRel from "../Models/album_song_rel.model.js";
import Song from "../Models/song.model.js";
import Artist from "../Models/artist.model.js";

// Relations 
Song.belongsTo(Artist);
Song.belongsToMany(Album, { through: AlbumSongRel });
Album.belongsToMany(Song, { through: AlbumSongRel });

export default class SongController {

	/**
	 * List Metode
	 * @param {*} req 
	 * @param {*} res 
	 */
	list = async (req, res) => {
		const result = await Song.findAll({
			attributes: ['title'],
			include: {
				model: Artist,
				attributes: ['name']
			}
		});
        res.status(200).send(result);
	}

	/**
	 * Detail Method
	 * @param {*} req 
	 * @param {*} res 
	 */
	details = async (req, res) => {
		const { id } = req.params;

		const result = await Song.findAll({
			attributes: ['title'],
 			where: { id: id },
			include: [{
				model: Artist,
				attributes: ['name']
			},{
				model: Album,
                attributes: ['title']
			}]
		});
        res.status(200).send(result);
	}	

	/**
	 * Create Method
	 * @param {*} req 
	 * @param {*} res 
	 */
	create = async (req, res) => {
		const { title, content, artist_id, is_active } = req.body;

		if(title && content && artist_id && is_active) {
			const result = await Song.create(req.body);
			res.status(200).send({
				message: 'Record created',
				new_id: result.id
			})
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Update Method
	 * @param {*} req 
	 * @param {*} res 
	 */
	update = async (req, res) => {
		console.log(req.body);
		const { id, title, content, artist_id, is_active } = req.body;

		if(id && title && content && artist_id && is_active) {
			const result = await Song.update(req.body, {
				where: { id: id }
			});
			res.status(200).send({
				message: 'Record updated'
			})
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Method
	 * @param {*} req 
	 * @param {*} res 
	 */
	delete = async (req, res) => {
		const { id } = req.params;

		if(id) {
			const result = await Song.destroy({
				where: { id: id }
			});
			res.status(200).send({
				message: 'Record deleted'
			})
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


}
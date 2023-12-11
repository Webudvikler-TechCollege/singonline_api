import Album from "../Models/album.model.js";
import Artist from "../Models/artist.model.js";
import Song from "../Models/song.model.js";

// Relations 
Artist.hasMany(Song);
Artist.hasMany(Album);

export default class ArtistController {

	/**
	 * List Metode
	 * @param {*} req 
	 * @param {*} res 
	 */
	list = async (req, res) => {
		const result = await Artist.findAll({
			attributes: ['name']
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

		const result = await Artist.findAll({
			attributes: ['name', 'description'],
 			where: { id: id },
			include: [{
				model: Song,
				attributes: ['title']
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
		const { name, description } = req.body;

		if(name && description) {
			const result = await Artist.create(req.body);
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
		const { id, name, description } = req.body;

		if(id && name) {
			const result = await Artist.update(req.body, {
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
			const result = await Artist.destroy({
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
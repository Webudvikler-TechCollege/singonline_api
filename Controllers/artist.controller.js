import Album from "../Models/album.model.js";
import Artist from "../Models/artist.model.js";
import Song from "../Models/song.model.js";

// Relations 
Artist.hasMany(Song);
Artist.hasMany(Album);

export default class ArtistController {

	/**
	 * Get all records
	 * @returns array
	 */
	get_all = async () => {
		const result = await Artist.findAll({
			attributes: ['id','name']
		});
        return result;
	}

	/**
	 * Get single record by primary key
	 * @param {number} id 
	 * @returns object
	 */
	get_single = async id => {

		const result = await Artist.findByPk(id, {
			include: [{
				model: Song,
				attributes: ['title']
			},{
				model: Album,
                attributes: ['title']
			}]
		});
		return result;
	}	

	/**
	 * Create new record
	 * @param {object} postdata Object with form data
	 * @returns object
	 */
	create = async postdata => {
		return await Artist.create(postdata);
	}

	/**
	 * Update record
	 * @param {object} postdata Object with form data
	 * @returns boolean
	 */
	update = async postdata => {
		return await Artist.update(postdata, { where: { id: postdata.id }});
	}

	/**
	 * Delete record
	 * @param {number} id 
	 * @returns boolean
	 */
	delete = async id => {
		return await Artist.destroy({ where: { id: id }});
	}
}
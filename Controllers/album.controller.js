import Artist from "../Models/artist.model.js";
import Album from "../Models/album.model.js";
import Song from "../Models/song.model.js";
import AlbumSongRel from "../Models/album_song_rel.model.js";

// Relations 
Album.belongsToMany(Song, { through: AlbumSongRel });
Album.belongsTo(Artist);

export default class AlbumController {

	/**
	 * Get all records
	 * @returns array
	 */
	get_all = async () => {
		const result = await Album.findAll({
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

		const result = await Album.findByPk(id, {
			include: [{
				model: Song,
				attributes: ['title']
			},{
				model: Artist,
                attributes: ['name']
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
		return await Album.create(postdata);
	}

	/**
	 * Update record
	 * @param {object} postdata Object with form data
	 * @returns boolean
	 */
	update = async postdata => {
		return await Album.update(postdata, { where: { id: postdata.id }});
	}

	/**
	 * Delete record
	 * @param {number} id 
	 * @returns boolean
	 */
	delete = async id => {
		return await Album.destroy({ where: { id: id }});
	}


}
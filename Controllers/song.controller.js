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
	 * Get all records
	 * @returns array
	 */
	get_all = async () => {
		const result = await Song.findAll({
			attributes: ['id','title']
		});
        return result;
	}

	/**
	 * Get single record by primary key
	 * @param {number} id 
	 * @returns object
	 */
	get_single = async id => {

		const result = await Song.findByPk(id, {
			include: [{
				model: Artist,
			},{
				model: Album,
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
		return await Song.create(postdata);
	}

	/**
	 * Update record
	 * @param {object} postdata Object with form data
	 * @returns boolean
	 */
	update = async postdata => {
		return await Song.update(postdata, { where: { id: postdata.id }});
	}

	/**
	 * Delete record
	 * @param {number} id 
	 * @returns boolean
	 */
	delete = async id => {
		return await Song.destroy({ where: { id: id }});
	}
}
import sequelize from "../Config/sequelize.config.js";
import { Model, DataTypes } from "sequelize";

class AlbumSongRel extends Model {}

AlbumSongRel.init({
	id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    track_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
    // Definér relation
},{
	sequelize,
    tableName: 'album_song_rel',
    underscored: true,
    freezeTableName: true,
    timestamps: false
})

export default AlbumSongRel
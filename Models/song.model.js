import sequelize from "../Config/sequelize.config.js";
import { Model, DataTypes } from "sequelize";
import Artist from "./artist.model.js";

class Song extends Model {}

Song.init({
	id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Artist,
            key: 'id'
        }
    }
},{
	sequelize,
    underscored: true,
})

export default Song

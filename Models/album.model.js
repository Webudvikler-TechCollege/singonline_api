import sequelize from "../Config/sequelize.config.js";
import { Model, DataTypes } from "sequelize";

const Album = sequelize.define("album", {
	id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
	sequelize,
    underscored: true,
})

export default Album
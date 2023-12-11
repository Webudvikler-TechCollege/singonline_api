import sequelize from "../Config/sequelize.config.js";
import { Model, DataTypes } from "sequelize";

class Artist extends Model { }

Artist.init({
	id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
	sequelize,
    underscored: true,
})

export default Artist
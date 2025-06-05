import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";
class Song extends Model {
}
Song.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: sequelize, // Pass the sequelize instance
    modelName: 'Song',
    tableName: 'songs',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
});
export default Song;

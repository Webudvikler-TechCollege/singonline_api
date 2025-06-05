import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Artist extends Model {
    public id!: number;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Artist.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Artist',
    tableName: 'artists',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
});

export default Artist;
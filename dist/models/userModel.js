import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";
import bcrypt from "bcrypt";
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize, // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
    hooks: {
        beforeCreate: async (user, options) => {
            user.password = await createHash(user.password);
        },
        beforeUpdate: async (user, options) => {
            user.password = await createHash(user.password);
        },
    },
});
User.addHook('beforeBulkCreate', async (users) => {
    // Krypter hver adgangskode før bulkCreate-operationen
    for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});
const createHash = async (string) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_string = await bcrypt.hash(string, salt);
    return hashed_string;
};
export default User;

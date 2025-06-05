import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";
import bcrypt from "bcrypt";

class User extends Model {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public refresh_token!: string;
    public is_active!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
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
        user.password = await createHash(user.password)
      },
      beforeUpdate: async (user, options) => {
        user.password = await createHash(user.password)
      },
    },

});

User.addHook('beforeBulkCreate', async (users: User[]) => {
  // Krypter hver adgangskode før bulkCreate-operationen
  for (const user of users) {
    (user as User).password = await bcrypt.hash((user as User).password, 10);
  }
});

interface CreateHash {
    (string: string): Promise<string>;
}

const createHash: CreateHash = async (string: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(10);
    const hashed_string: string = await bcrypt.hash(string, salt);
    return hashed_string;
};

export default User;
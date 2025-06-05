// Import af dependencies
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Giver adgang til variabler fra en .env-fil via process.env
dotenv.config();
const { DBNAME, DBUSER, DBPASSWD, DBHOST, DBPORT } = process.env;
// Kast fejl hvis nødvendige variabler mangler
if (!DBNAME || !DBUSER || !DBPASSWD || !DBHOST || !DBPORT) {
    throw new Error('Missing required database environment variables');
}
const sequelize = new Sequelize(DBNAME, DBUSER, DBPASSWD, {
    host: DBHOST,
    port: parseInt(DBPORT),
    dialect: 'mysql',
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
    }
});
export default sequelize;

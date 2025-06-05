import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import sequelize from '../config/sequelize.js';
/**
 * Reads data from a CSV file and returns it as an array of objects.
 * @param {string} fileName - The name of the CSV file.
 * @returns {Promise<Array>} - A promise that resolves with the parsed CSV data.
 */
const getCsvData = async (fileName) => {
    const csvPath = path.resolve(`./data/${fileName}`);
    const data = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });
};
/**
 * Seeds the database with data from a CSV file.
 * @param {string} fileName - The name of the CSV file to seed from.
 * @param {any} model - The Sequelize model to use for seeding.
 * @returns {Promise<string>} - A promise that resolves with a success message.
 */
const seedFromCsv = async (fileName, model) => {
    const transaction = await sequelize.transaction();
    try {
        const data = await getCsvData(fileName);
        await model.bulkCreate(data, { transaction });
        await transaction.commit();
        console.log(`Seeding completed for ${fileName}`);
        return fileName;
    }
    catch (error) {
        await transaction.rollback();
        console.error(`Error seeding from ${fileName}:`, error);
        return false;
    }
};
export { getCsvData, seedFromCsv };

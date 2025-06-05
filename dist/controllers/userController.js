import express from "express";
import { User } from "../models/index.js";
import { Authorize } from "../utils/authUtils.js";
export const userController = express.Router();
const url = 'users';
userController.get(`/${url}`, Authorize, async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: ['id', 'firstname', 'lastname', 'email', 'createdAt']
        });
        if (!data || data.length === 0) {
            res.status(404).json({ message: "No Users found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching Users: ${error.message}` });
    }
});
userController.get(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const data = await User.findByPk(id, {
            attributes: ['id', 'firstname', 'lastname', 'email', 'is_active', 'createdAt'],
        });
        if (!data) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching User: ${error.message}` });
    }
});
userController.post(`/${url}`, Authorize, async (req, res) => {
    const { firstname, lastname, email, password, refresh_token, is_active } = req.body;
    try {
        const newData = await User.create({ firstname, lastname, email, password, refresh_token, is_active });
        res.status(201).json(newData);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating User: ${error.message}` });
    }
});
userController.put(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    const { firstname, lastname, email, password, refresh_token, is_active } = req.body;
    try {
        const [updated] = await User.update({ firstname, lastname, email, password, refresh_token, is_active }, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error updating User: ${error.message}` });
    }
});
userController.patch(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const { password, confirmPassword } = req.body;
        // Validate password exists
        if (!password) {
            res.status(400).json({ message: "Password is required" });
        }
        // Optional: Validate password confirmation
        if (confirmPassword && password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
        }
        // Update record 
        const [updated] = await User.update({ password }, {
            where: { id },
            individualHooks: true // Åbner for hooks i modellen
        });
        if (!updated) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating User: ${error.message}` });
    }
});
userController.delete(`/${url}/:id`, Authorize, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting User: ${error.message}` });
    }
});

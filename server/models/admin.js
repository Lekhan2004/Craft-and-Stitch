const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Admin Schema
const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    firstName: String,
    lastName: String,
    role: { type: String, enum: ['SuperAdmin', 'ModeratorAdmin', 'SupportAdmin'], required: true },
    lastLogin: Date,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
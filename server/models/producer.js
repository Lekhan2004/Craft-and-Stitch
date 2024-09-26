const mongoose = require('mongoose')
const Schema = mongoose.Schema

const producerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    companyName: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    profilePicture: String,
    description: String,
    specializations: [String],
    productionCapacity: Number,
    minimumOrderQuantity: Number,
    averageLeadTime: Number,
    certifications: [String],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    lastLogin: Date,
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' }
  });
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const designerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    registrationDate: { type: Date, default: Date.now },
    profilePicture: String,
    bio: String,
    specializations: [String],
    portfolioUrl: String,
    socialMediaLinks: {
      instagram: String,
      linkedin: String,
      behance: String
    },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalDesigns: { type: Number, default: 0 },
    successfulAuctions: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    lastLogin: Date,
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' }
  });
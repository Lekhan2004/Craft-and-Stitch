import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const designerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  registrationDate: { type: Date, default: Date.now },
  profilePicture: { type: String, required: false },
  bio: { type: String, required: false },
  specializations: [{ type: String, required: false }],
  portfolioUrl: { type: String, required: false },
  socialMediaLinks: {
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
    behance: { type: String, required: false }
  },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  totalDesigns: { type: Number, default: 0 },
  successfulAuctions: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date, required: false },
});

// Encrypt password before saving
designerSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Create model "Designer" with the defined schema
const Designer = mongoose.model('Designers', designerSchema);

export default Designer;

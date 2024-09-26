import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const producerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  companyName: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  profilePicture: { type: String, required: false },
  description: { type: String, required: false },
  specializations: [{ type: String, required: false }],
  productionCapacity: { type: Number, required: false },
  minimumOrderQuantity: { type: Number, required: false },
  averageLeadTime: { type: Number, required: false },
  certifications: [{ type: String, required: false }],
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date, required: false },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Suspended'], 
    default: 'Active' 
  }
});

// Encrypt password before saving
producerSchema.pre('save', async function(next) {
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

// Create model "Producer" with the defined schema
const Producer = mongoose.model('Producers', producerSchema);

export default Producer;

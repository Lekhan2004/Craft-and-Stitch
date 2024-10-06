import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// Admin Schema
const adminSchema = new Schema({
  
  username: { type: String, required: false, unique: true },
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false }, // Hashed
  role: { 
    type: String, 
    enum: ['SuperAdmin', 'ModeratorAdmin', 'SupportAdmin'], 
    required: false 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Encrypt password before saving
adminSchema.pre('save', async function(next) {
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

// Create model "Admin" with the defined schema
const Admin = mongoose.model('Adminss', adminSchema);

export default Admin;

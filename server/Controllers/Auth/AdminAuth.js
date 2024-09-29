import Admin from '../../models/admin.js'; // Adjust the path as needed
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const jwtSecret = 'sar1p0dha'; // Use a secure key from environment variables

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sign-in function
export const signInAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, username: admin.username }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

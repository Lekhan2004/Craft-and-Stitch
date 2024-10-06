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
    const { userId, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ userId });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, userId: admin.userId }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ContinueWithGoogle = async (req, res) => {
  try {
      const { userId } = req.body;

      // Check if the user already exists
      let user = await Admin.findOne({ userId });

      if (user) {
          // Generate token for existing user
          const token = jwt.sign({ userId: user.userId }, jwtSecret, { expiresIn: '1h' });
          return res.status(201).json({ token, message: "User already exists", user });
      }

      // Create a new user
      user = new Admin({ userId });
      await user.save();

      // Generate token for new user
      const token = jwt.sign({ userId: user.userId }, jwtSecret, { expiresIn: '1h' });

      res.status(200).json({
          token,
          user: {
              id: user.userId
          },
          message: "User created successfully, please update your info."
      });
  } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



export const UpdateInfo = async (req, res) => {
  try {
      const { userId, username, email, password, role } = req.body;

      // Find the user by userId
      let user = await Admin.findOne({ userId });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update only the fields that are provided
      if (username) user.username = username;
      if (email) user.email = email;

      if (password) {
          // Hash the password before saving
          user.password = await bcrypt.hash(password, 10);
      }

      user.role = role || user.role; // Update role only if provided
      user.isActive = true; // Ensure the user is active

      await user.save();

      res.status(200).json({
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
          },
          message: "User info updated successfully."
      });
  } catch (error) {
      console.error("Error during Update:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

import Designer from "../../models/designer.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const jwtSecret = 'sar1p0dha';
export const createDesigner = async (req, res) => {
    try {
      const newDesigner = new Designer(req.body);
      await newDesigner.save();
      res.status(201).json(newDesigner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Sign-in function
  export const signInDesigner = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the Designer exists
      const designer = await Designer.findOne({ username });
      if (!designer) return res.status(400).json({ message: 'Designer not found' });
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, designer.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: 'Invalid credentials' });
  
      // Generate a JWT token
      const token = jwt.sign({ id: designer._id, username: designer.username }, jwtSecret, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
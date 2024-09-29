import Producer from "../../models/producer.js"; // Adjust the path as needed
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const jwtSecret = 'sar1p0dha';

// Create a new Producer
export const createProducer = async (req, res) => {
  try {
    const newProducer = new Producer(req.body);
    await newProducer.save();
    res.status(201).json(newProducer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sign-in function
export const signInProducer = async (req, res) => {
  try {
    const { email, password } = req.body; // Use email instead of username

    // Check if the Producer exists
    const producer = await Producer.findOne({ email });
    if (!producer) return res.status(400).json({ message: 'Producer not found' });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, producer.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: producer._id, email: producer.email }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AdminRoutes from './Routes/AdminRoutes.js'; // Ensure path is correct
import DesignerRoutes from './Routes/DesignerRoutes.js'
import ProducerRoutes from './Routes/ProducerRoutes.js'


const app = express();

// Middleware
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["GET", "PUT", "POST"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/admin', AdminRoutes);
app.use('/api/admin', DesignerRoutes);
app.use('/api/admin', ProducerRoutes);

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Base Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

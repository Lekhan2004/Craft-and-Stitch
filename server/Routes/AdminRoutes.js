import express from 'express';
import {createAdmin} from "../Controllers/Auth/AdminAuth.js"

const router = express.Router();
router.post("/AdminRegister", (req, res, next) => {
    console.log('Admin registration request:', req.body);
    next();
  }, createAdmin);
  
export default router;
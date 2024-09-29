import express from 'express';
import {createAdmin,signInAdmin} from "../Controllers/Auth/AdminAuth.js"

const router = express.Router();
router.post("/AdminRegister", (req, res, next) => {
    console.log('Admin registration request:', req.body);
    next();
  }, createAdmin);
  router.post("/AdminSignIn",signInAdmin);
  
export default router;
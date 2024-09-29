import express from 'express';
import {createDesigner,signInDesigner} from "../Controllers/Auth/DesignerAuth.js"

const router = express.Router();
router.post("/DesignerRegister", (req, res, next) => {
    console.log('Designer registration request:', req.body);
    next();
  }, createDesigner);
  router.post("/DesignerSignIn",signInDesigner);
  
export default router;
import express from 'express';
import {createAdmin,signInAdmin,UpdateInfo,ContinueWithGoogle} from "../Controllers/Auth/AdminAuth.js"

const router = express.Router();
router.post("/AdminRegister",  createAdmin);
router.post("/AdminGoogleSignIn",  ContinueWithGoogle);
router.post("/AdminUpdate",  UpdateInfo);
  router.post("/AdminSignIn",signInAdmin);
  
export default router;
import express from 'express';
import {createProducer,signInProducer} from "../Controllers/Auth/ProducerAuth.js"

const router = express.Router();
router.post("/ProducerRegister", (req, res, next) => {
    console.log('Producer registration request:', req.body);
    next();
  }, createProducer);
  router.post("/ProducerSignIn",signInProducer);
  
export default router;
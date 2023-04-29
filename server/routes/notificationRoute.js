import express from 'express';

import { getNotifications, readAllNotifications } from '../controllers/notificationController.js';
import { authenticate } from "../middleware/auth.js";

const router = express.Router();


router.get('/', authenticate, getNotifications);
router.post('/', authenticate, readAllNotifications);


export default router;
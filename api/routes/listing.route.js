import express from 'express';
import multer from 'multer';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/upload', verifyToken, upload.single('image'), uploadImage);

export default router;

import express from 'express';
const router = express.router();
import {getAllArtworks,
  createArtwork,
  getArtworkById,
  updateArtworkById,
  deleteArtworkById,
  getTopArtworks,
  createArtworkReview
} from '../controllers/artworkController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
router.route('/').get(getAllArtworks).post(protect, admin, createArtwork)
router.route('/:id/reviews').post(protect, createArtworkReview)
router.get('/top',getTopArtworks)
router
    .route('/:id')
    .get(getArtworkById)
    .delete(protect, admin, deleteArtworkById)
    .put(protect, admin, updateArtworkById)
    export default router
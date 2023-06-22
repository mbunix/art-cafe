const express = require('express')
const router = express.Router();
const artworkController = require('../controllers/artworkController');

// define the related routes for the artwork controller
router.get('/artworks', artworkController.getAllArtworks);
router.get('/artworks/:id', artworkController.getArtworkById);
router.post('/artworks', artworkController.createArtwork);
router.put('/artworks/:id', artworkController.updateArtworkById);
router.delete('/artworks/:id', artworkController.deleteArtworkById);

module.exports = router


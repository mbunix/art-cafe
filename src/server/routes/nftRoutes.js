const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftContoller');

// define related nft route endpoits
router.get('/nfts', nftController.getAllNFTs);
router.get('/nfts/:id', nftController.getNFTById);
router.post('/nfts', nftController.createNFT);
router.put('/nfts/:id', nftController.updateNFTById);
router.delete('/nfts/:id', nftController.deleteNFTById);

module.exports = router;

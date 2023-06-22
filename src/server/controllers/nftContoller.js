const NFT = require('../models/nft')

// Controller functions for NFT management

// Get all NFTs
const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find()
    res.json(nfts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch NFTs' })
  }
}

// Create new NFT
const createNFT = async (req, res) => {
  try {
    const { title, description, artist, price } = req.body
    const nft = new NFT({ title, description, artist, price })
    const savedNFT = await nft.save()
    res.status(201).json(savedNFT)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create NFT' })
  }
}

// Get NFT by ID
const getNFTById = async (req, res) => {
  try {
    const { id } = req.params
    const nft = await NFT.findById(id)
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.json(nft)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch NFT' })
  }
}

// Update NFT by ID
const updateNFTById = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, price } = req.body
    const updatedNFT = await NFT.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    )
    if (!updatedNFT) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.json(updatedNFT)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update NFT' })
  }
}

// Delete NFT by ID
const deleteNFTById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedNFT = await NFT.findByIdAndDelete(id)
    if (!deletedNFT) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.json(deletedNFT)
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete NFT' })
  }
}

module.exports = {
  getAllNFTs,
  createNFT,
  getNFTById,
  updateNFTById,
  deleteNFTById
}

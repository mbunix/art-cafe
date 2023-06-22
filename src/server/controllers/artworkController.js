const Artwork = require('../models/artwork')

// Controller functions for artwork management

// Get all artworks
const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find()
    res.json(artworks)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artworks' })
  }
}

// Create new artwork
const createArtwork = async (req, res) => {
  try {
    const { title, description, artist,imageUrl } = req.body
    const artwork = new Artwork({ title, description, artist,imageUrl })
    const savedArtwork = await artwork.save()
    res.status(201).json(savedArtwork)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create artwork' })
  }
}

// Get artwork by ID
const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params
    const artwork = await Artwork.findById(id)
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' })
    }
    res.json(artwork)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artwork' })
  }
}

// Update artwork by ID
const updateArtworkById = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )
    if (!updatedArtwork) {
      return res.status(404).json({ message: 'Artwork not found' })
    }
    res.json(updatedArtwork)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update artwork' })
  }
}

// Delete artwork by ID
const deleteArtworkById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedArtwork = await Artwork.findByIdAndDelete(id)
    if (!deletedArtwork) {
      return res.status(404).json({ message: 'Artwork not found' })
    }
    res.json(deletedArtwork)
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete artwork' })
  }
}

module.exports = {
  getAllArtworks,
  createArtwork,
  getArtworkById,
  updateArtworkById,
  deleteArtworkById
}

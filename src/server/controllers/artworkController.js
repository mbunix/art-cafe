import Artwork from '../database/models/artwork';
import asyncHandler from 'express-async-handler';

// Get all artworks
const getAllArtworks = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword || '';
  const offset = (page - 1) * pageSize;
  try {
    const count = await Artwork.count({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    });
    const artworks = await Artwork.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      },
      limit: pageSize,
      offset: offset
    });
    res.json({ artworks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artworks' });
  }
});

// Create new artwork
const createArtwork = asyncHandler(async (req, res) => {
  try {
    const artwork = await Artwork.create({
      title: req.body.title,
      description: req.body.description,
      artist: req.body.artist,
      artistImage: req.body.artistImage,
      imageUrl: req.body.imageUrl
    })

    // Generate new NFT token and associate it with artwork
    await artwork.save()

    res.status(201).json(artwork)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create artwork' })
  }

})


// Get artwork by ID
const getArtworkById = asyncHandler(async (req, res) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artwork' });
  }
});

// Update artwork by ID
const updateArtworkById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, artist, artistImage, imageUrl } = req.body;
    const artwork = await Artwork.findByPk(id);
    if (artwork) {
      artwork.title = title;
      artwork.description = description;
      artwork.artist = artist;
      artwork.artistImage = artistImage;
      artwork.imageUrl = imageUrl;
      const updatedArtwork = await artwork.save();
      res.json(updatedArtwork);
    } else {
      res.status(404);
      throw new Error('Artwork not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update artwork' });
  }
});

// Get top artworks
const getTopArtworks = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const offset = (page - 1) * pageSize;
    const artworks = await Artwork.findAll({
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']] // Sort by most recent
    });
    const count = await Artwork.count();
    res.json({ artworks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artworks' });
  }
});

// Delete artwork by ID
const deleteArtworkById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArtwork = await Artwork.destroy({
      where: {
        id: id
         }
});
if (!deletedArtwork) {
  return res.status(404).json({ message: 'Artwork not found' });
}
res.json(deletedArtwork);
} catch (error) { res.status(500).json({ message: 'Failed to delete artwork' }); } });

// Create a new review 
const createArtworkReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

const artwork = await Artwork.findByPk(req.params.id);

if (artwork) { const alreadyReviewed = artwork.reviews.find(r => r.user.toString() === req.user._id.toString());
 if (alreadyReviewed) {
  res.status(400);
  throw new Error('Artwork already reviewed');
}

const review = {
  name: req.user.name,
  rating: Number(rating),
  comment,
  user: req.user._id
};

artwork.reviews.push(review);

artwork.numReviews = artwork.reviews.length;

artwork.rating =
  artwork.reviews.reduce((acc, item) => item.rating + acc, 0) /
  artwork.reviews.length;

await artwork.save();
res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404); throw new Error('Artwork not found');
  }
});

export { getAllArtworks, createArtwork, getArtworkById, updateArtworkById, deleteArtworkById, getTopArtworks, createArtworkReview }; 
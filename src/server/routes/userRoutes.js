// all routes of the user
import express from 'express'
const router = express.Router()
import {
  authUser,
  signupUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userControllers'
import { protect, admin } from '../middlewares/authMiddleware.js'
router.route('/'), post(signupUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect,getUserProfile)
    .put(protect, updateUserProfile)
router 
    .route('/:id')
    .get(protect, admin, deleteUser)
    .delete(protect, admin, getUserById)
    .get(protect, admin, updateUser)
    
export default router
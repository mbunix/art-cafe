import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';
import User from '../database/models/orderModels.js';

// Authenticate user and get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Register a new user
const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    location,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      location: user.location,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get all users (admin only)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Delete user (admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.destroy();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get user by ID (admin only)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user (admin only)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk
    (req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email|| user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
const updatedUser = await user.save();

res.json({
  id: updatedUser.id,
  name: updatedUser.name,
  email: updatedUser.email,
  isAdmin: updatedUser.isAdmin,
});
} else { res.status(404); throw new Error('User not found'); } });

export {
    authUser, signupUser,
    getUserProfile, updateUserProfile,
    getUsers, deleteUser,
    getUserById, updateUser,
};
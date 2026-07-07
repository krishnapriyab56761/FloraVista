const express = require('express');
const Plant = require('../models/Plant');
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
});

// Add new plant
router.post('/', async (req, res) => {
  const plant = new Plant(req.body);
  await plant.save();
  res.json(plant);
});

module.exports = router;

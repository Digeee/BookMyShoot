const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');

// Get portfolio items for a professional
router.get('/', portfolioController.getPortfolio);

// Add a new portfolio item
router.post('/', portfolioController.addPortfolioItem);

// Delete a portfolio item
router.delete('/:id', portfolioController.deletePortfolioItem);

module.exports = router;
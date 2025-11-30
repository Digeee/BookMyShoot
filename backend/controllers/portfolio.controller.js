const db = require('../config/database');

const getPortfolio = async (req, res) => {
  try {
    const { pro_id } = req.query;
    
    if (!pro_id) {
      return res.status(400).json({ error: 'Professional ID is required' });
    }
    
    const [rows] = await db.execute(
      'SELECT * FROM portfolios WHERE pro_id = ? ORDER BY created_at DESC',
      [pro_id]
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Server error while fetching portfolio' });
  }
};

const addPortfolioItem = async (req, res) => {
  try {
    const { pro_id, media_url, media_type, caption, thumbnail_url } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO portfolios (pro_id, media_url, media_type, caption, thumbnail_url) VALUES (?, ?, ?, ?, ?)',
      [pro_id, media_url, media_type, caption, thumbnail_url]
    );
    
    // Update portfolio count in profile
    await db.execute(
      'UPDATE profiles SET portfolio_count = portfolio_count + 1 WHERE user_id = ?',
      [pro_id]
    );
    
    const [rows] = await db.execute(
      'SELECT * FROM portfolios WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    res.status(500).json({ error: 'Server error while adding portfolio item' });
  }
};

const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get pro_id before deleting
    const [portfolioRows] = await db.execute(
      'SELECT pro_id FROM portfolios WHERE id = ?',
      [id]
    );
    
    if (portfolioRows.length === 0) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    
    const pro_id = portfolioRows[0].pro_id;
    
    // Delete portfolio item
    await db.execute(
      'DELETE FROM portfolios WHERE id = ?',
      [id]
    );
    
    // Update portfolio count in profile
    await db.execute(
      'UPDATE profiles SET portfolio_count = GREATEST(0, portfolio_count - 1) WHERE user_id = ?',
      [pro_id]
    );
    
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ error: 'Server error while deleting portfolio item' });
  }
};

module.exports = {
  getPortfolio,
  addPortfolioItem,
  deletePortfolioItem
};
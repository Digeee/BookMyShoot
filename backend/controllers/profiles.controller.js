const db = require('../config/database');

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get profile data
    const [profileRows] = await db.execute(
      'SELECT * FROM profiles WHERE user_id = ?',
      [id]
    );
    
    if (profileRows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const profile = profileRows[0];
    
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error while fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { business_name, bio, location_city, location_area, lat, lng, languages } = req.body;
    
    // Check if profile exists
    const [existingRows] = await db.execute(
      'SELECT user_id FROM profiles WHERE user_id = ?',
      [id]
    );
    
    if (existingRows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Update profile
    await db.execute(`
      UPDATE profiles 
      SET business_name = ?, bio = ?, location_city = ?, location_area = ?, lat = ?, lng = ?, languages = ?
      WHERE user_id = ?
    `, [business_name, bio, location_city, location_area, lat, lng, languages, id]);
    
    // Get updated profile
    const [profileRows] = await db.execute(
      'SELECT * FROM profiles WHERE user_id = ?',
      [id]
    );
    
    res.json(profileRows[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
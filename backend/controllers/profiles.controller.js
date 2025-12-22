const db = require('../config/database');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');

const getProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Get profile data
  const [profileRows] = await db.execute(
    'SELECT * FROM profiles WHERE user_id = ?',
    [id]
  );
  
  if (profileRows.length === 0) {
    throw new NotFoundError('Profile not found');
  }
  
  const profile = profileRows[0];
  
  logInfo('Profile fetched', { userId: id });
  
  res.json({
    success: true,
    data: profile
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { business_name, bio, location_city, location_area, lat, lng, languages } = req.body;
  
  // Check if profile exists
  const [existingRows] = await db.execute(
    'SELECT user_id FROM profiles WHERE user_id = ?',
    [id]
  );
  
  if (existingRows.length === 0) {
    throw new NotFoundError('Profile not found');
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
  
  logInfo('Profile updated', { userId: id });
  
  res.json({
    success: true,
    data: profileRows[0]
  });
});

module.exports = {
  getProfile,
  updateProfile
};
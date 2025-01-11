const bcrypt = require('bcrypt');

async function generateHash(password) {
  try {
    // Generate a salt
    const saltRounds = 10;  // This is the number of rounds for salt generation (higher = more secure but slower)
    const salt = await bcrypt.genSalt(saltRounds);

    // Generate the hash by combining the password and the salt
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
    throw error;
  }
}

module.exports = generateHash;
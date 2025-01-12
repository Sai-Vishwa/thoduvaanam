const bcrypt = require('bcrypt');

async function hashGenerator(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return {hash:hash , salt:salt}
  } catch (err) {
    return {err:"Internal error generating hash"}
  }
}

module.exports = {hashGenerator};
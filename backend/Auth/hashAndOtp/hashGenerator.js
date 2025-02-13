const bcrypt = require('bcrypt');

async function hashGenerator(password) {
      try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return({hash:hash,salt:salt})
      }
      catch(error){
        console.log(error)
        return({err:"Internal error generating hash"})
      }
}
// async function run(){
//   const data = await hashGenerator("kanguva")
//   console.log(data)
// }
// run()
module.exports = {hashGenerator};


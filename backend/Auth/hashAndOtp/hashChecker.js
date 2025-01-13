const bcrypt = require('bcrypt');

async function hashChecker(salt  ,hash , password) {
      try{  const computedhash = await bcrypt.hash(password, salt);
        if(hash===computedhash){
          return 1;
        }
        else{
          return 0;
        }}
        catch(error){
          console.log(error)
          return 0;
        }
}

module.exports =  {
  hashChecker
}
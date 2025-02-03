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
// async function run(){
//   const data = await hashChecker('$2b$10$sjCB0TsU86G2F3CWOv.w0O','$2b$10$sjCB0TsU86G2F3CWOv.w0OH87PWCU2lLiof1jW2e61wT4qtHkSsnu',"Mypassword")
//   console.log(data)
// }
// run()
module.exports =  {
  hashChecker
}
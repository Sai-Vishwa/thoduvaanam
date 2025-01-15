function SubmitButton({unameRegno,password}){
    function onSubmit(){
        if(type=="login"){
            fetch("http://localhost:4000/login-signup/login",{
                method: 'Post',
                headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                unameRegno:unameRegno,
                password:password
            })})
              .then((resp)=>{return resp.json()})
              .then(data =>{
                
        })
    }
    return(<>
    </>)
}
export default SubmitButton;
import { useNavigate } from 'react-router-dom';
function SubmitButton({unameOrRno,password,type,data,setOTP,forgotpassword,setUnameError,setPasswordError}){
    const nav = useNavigate;
    function onSubmit(){
        if(type=="block" && forgotpassword.val=="forgot password?"){
            let flag=0;
            if(unameOrRno==""){
                setUnameError({"val":"*Username cannot be empty","style":"text-white"})
                flag+=1;
            }
            else{
                setUnameError({"val":"Kaaka katha keturukken","style":"text-blue-950"})
            }
            if(password==""){
                setPasswordError({"val":"*Password cannot be empty","style":"text-white"})
                flag+=1
            }
            else{
                setPasswordError({"val":"Kaathula ola otirukken","style":"text-blue-950"})
            }
            if(flag==0){
            fetch("http://localhost:4000/login-signup/login",{
                method: 'Post',
                headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                unameOrRno:unameOrRno,
                password:password
            })})
              .then((resp)=>{return resp.json()})
              .then(data =>{
                if(data.err){
                    alert(data.err)
                }
                else{
                    document.cookie = `session=${data.session}; max-age=3600; path=/`
                    alert("Login successful");
                    nav("/");
                }
              }
            ).catch(err =>{
                console.log(err);
                alert("Some error")
            })
        }}
        else if(type=="block"){
            
        }
        else{
            fetch("http://localhost:4000/login-signup/signup",{
                method: 'Post',
                headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data:data
            })})
              .then((resp)=>{return resp.json()})
              .then(dat =>{
                if(dat.err){
                    alert(dat.err)
                }
                else{
                    document.cookie = `session=${data.session}; max-age=3600; path=/`
                    alert(dat.msg);
                    setOTP("block")
                }
              }
            )
            .catch(err=>{
                console.log(err);
                alert("some error");
            })
        }
    }
    return(<>
    <button onClick={onSubmit} className='border-2 border-white cursor-pointer rounded-lg px-1 py-2 text-white  bg-blue-950 hover:text-3xl'>
        Submit
    </button>
    </>)
}
export default SubmitButton;
import { useNavigate } from 'react-router-dom';
function SubmitButton({unameOrRno,password,type,data,setOTP}){
    const nav = useNavigate;
    function onSubmit(){
        if(type=="block"){
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
    <button onClick={onSubmit} className='border-2 border-white cursor-pointer rounded-lg px-1 py-2 text-white hover:text-red-800 bg-red-800 hover:bg-white'>
        Submit
    </button>
    </>)
}
export default SubmitButton;
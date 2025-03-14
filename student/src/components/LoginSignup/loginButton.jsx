import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

function LoginButton({forgotPassword ,loginData , loginError , setLoginError , setOtpDiv}){
    const name = forgotPassword.style!=="hidden"?"Login":"Send Otp"
    const nav = useNavigate();
    async function onSubmit(){
        console.log("im getting called")
        let flag = true
        if(name === "Login"){
            // if(loginData.rno){
            //     // yet to do
            //     // manage the if
            //     setLoginError({...loginError , "rnoError":"val"})
            //     flag = false
            // }
            // if(loginData.password){
            //     // yet to do
            //     // manage the if
            //     setLoginError({...loginError , "password":"val"})
            //     flag = false
            // }
            if (flag){
                console.log("inside if")
                try{
                    const submit = await fetch("http://localhost:4000/login-signup/login",{
                        method:"POST",
                        body: JSON.stringify(loginData),
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    })
                    const data = await submit.json()
                    if(data.msg){
                        Cookies.set('session',data.session,{expires: 10/24})
                        alert("login successful")
                        nav(`/${data.uname}`)
                    }
                    else {
                        throw new Error(JSON.stringify(data))
                    }
                }
                catch(error){
                    console.log(JSON.stringify(error.message))
                    alert(JSON.stringify(error.message));
                }
            }
        }
        else{
            if(loginData.rno){
                // yet to do
                // manage the if
                setLoginError({...loginError , "rnoError":"val"})
                flag = false
            }
            try{
                const otp = await fetch("http://localhost:4000/login-signup/forgot-password",{
                    method:"POST",
                    body: JSON.stringify(loginData),
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const  status = await otp.json()
                if(status.msg){
                    alert("OTP sent successfully")
                    setOtpDiv("block")
                }
            }
            catch(error){
                alert(JSON.stringify(error.message))
            }
            
        }
    }
    return(<div>
        <button className="SubmitButton" onClick={onSubmit}>
            {name}
        </button>
    </div>)
}

export default LoginButton
function SignUpButton({setOtpDiv , signUpError , setSignUpError , signUpData}){

    async function onSubmit(e) {
        let flag = true
        try{
            if(!signUpError.isVerified){
                setSignUpError({...signUpError , "uname":"uname not verified"})
                flag = false
            }
            // if(e){
            //     //name
            // }
            // if(e){
            //     //pwd
            // }
            // if(e){
            //     //con pwd
            // }
            // if(e){
            //     //lc n
            // }
            // if(e){
            //     //lc p
            // }
            // if(e){
            //     //rno
            // }
            if(flag){
                const setOtp = await fetch("http://localhost:4000/login-signup/signup",{
                    method:"POST",
                    body: JSON.stringify(signUpData),
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const data = await setOtp.json()
                if(data.msg){
                    setOtpDiv("block")
                }
                else{
                    console.log(JSON.stringify(data))
                    throw new Error(data)
                }
            }
            
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    return(<div>
        <button className="SubmitButton" onClick={onSubmit}>
            Sign Up
        </button>
    </div>)
}

export default SignUpButton
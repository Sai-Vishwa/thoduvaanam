function ResendButton({rno}){
    async function resendOtp(){
        try{
            const resend = await fetch("http://localhost:4000/login-signup/otp-resend",{
                method:"POST",
                body: JSON.stringify({rno:rno}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await resend.json()
            if(data.msg){
                alert("otp resent successfully")
            }
            else{
                throw new Error(data)
            }
        }
        catch(error){
            alert(error.message)
        }
    }
 return(
    <div>
        <button onClick={resendOtp}>Resend OTP</button>
    </div>
 )
}
export default ResendButton
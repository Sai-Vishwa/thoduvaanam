import Cookies from 'js-cookie';
function VerifyButton({type,rno,otp}){

    async function verify(){
        try{
            console.log(JSON.stringify(otp))
            const verification = await fetch(`http://localhost:4000/login-signup/otp-verify-${type}`,{
                method:"POST",
                body: JSON.stringify({rno:rno,otp:otp}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await verification.json()
            if(data.msg){
                alert("Otp verified successfully")
                Cookies.set('session',data.session,{expires: 5/24})
                nav("/")
            }
            else{
                throw new Error(JSON.stringify(data))
            }
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }

    return (
        <div>
            <button onClick={verify}>
                Verify Button
            </button>
        </div>
    )
}
export default VerifyButton
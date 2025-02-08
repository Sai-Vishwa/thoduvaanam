import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function VerifyButton({type,rno,otp}){
    const nav = useNavigate();
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
                console.log(data.session);
                console.log(JSON.stringify(data))
                Cookies.set('session',data.session,{expires: 5/24})
                nav(`/home/:${data.uname}`)
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
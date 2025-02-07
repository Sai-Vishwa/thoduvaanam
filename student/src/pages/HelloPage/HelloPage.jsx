import { useNavigate } from "react-router-dom"

function HelloPage(){
    const nav = useNavigate();
    return(
        <div>
            <button onClick={()=>{nav("/login")}}>Login</button>
            <button onClick={()=>{nav("/signup")}}>Signup</button>
        </div>  
    )
}
export default HelloPage
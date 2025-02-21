import { useNavigate, useParams } from "react-router-dom"

function ChangePasswordPage(){
    const uname = useParams();
    const nav = useNavigate()
    return(
        <div className="text-white">
        Intha page is still under development
        Password la change panna mudiyathu
        Venum na home page po
        <br />
        <button onClick={()=>{nav(`/${uname}`)}} className="border-2 border-white p-2 mt-10">
            Home
        </button>
        </div>
    )
}

export default ChangePasswordPage
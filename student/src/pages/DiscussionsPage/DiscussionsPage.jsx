import { useNavigate, useParams } from "react-router-dom"

function DiscussionsPage(){

    const nav = useNavigate()
    const {uname} = useParams()
    return (
        <div>
            This is the discussions page
            <br />
            <button onClick={()=>{
                nav(`/${uname}`)
            }}>
                Click to nav back to home 
            </button>
        </div>
    )
}

export default DiscussionsPage
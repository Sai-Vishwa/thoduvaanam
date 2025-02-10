import { useNavigate } from "react-router-dom"

function Question({question , uname}){
    const nav = useNavigate();
    return(
        <div onClick={()=>{nav(`/${uname}/question/${question.title}`)}} className="cursor-pointer">
            Hi
            <h4>{question.title}</h4>
            <h6>{question.difficulty}</h6>
            {question.submission.length == 0 ?<p>have a tick here</p>:<></>}
        </div>
    )
}
export default Question
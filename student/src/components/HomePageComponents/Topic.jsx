import { useNavigate } from "react-router-dom"
import Question from "./Question"

function Topic({topic , uname}){

    const nav = useNavigate()
    return (
        <div>

            <h2>{topic.id}{topic.name}</h2>
            {topic.question.map((question) =>(
                <Question 
                question={question}
                uname={uname}/>
            ))}
            <div onClick={()=>{
                nav(`/${uname}/contest/${topic.name}`)
            }}>
                Contest - Test
            </div>
        </div>
    )
}
export default Topic
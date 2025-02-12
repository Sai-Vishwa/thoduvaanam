import { useNavigate } from "react-router-dom";

function QuestionInfo({question}){

    const nav = useNavigate();

    return (
        <>
            {JSON.stringify(question)}

            <button onClick={()=>{nav(`/${uname}/coding/${question.qname}`)}}>{question.attemptStatus}</button>
        </>
    )
}
export default QuestionInfo;
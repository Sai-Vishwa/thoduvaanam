import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie'
import Header from "../../components/Common/Header";
function QuestionPage(){
    const {uname,qname}= useParams();
    const [questionData , setQuestionData] = useState({})
    const [attempt , setAttempt] = useState("Attempt Problem")
    const nav = useNavigate();

    function toCodePage(){
        if(attempt === "Attempt Problem" || attempt === "Re-Attempt Problem"){
            const flag = window.confirm("Sure to start an attempt????")
        }
    }

    useEffect(()=>{
        const isSubmittedFunc = async () => {
            const submissionData = await fetch("http://localhost:4000/basic/login",{
                method:"POST",
                body: JSON.stringify({session:Cookies.get("session"),uname:uname , qname:qname}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await submissionData.json()
            setQuestionData(data)
            
        }
        if(questionData=={}){
            isSubmittedFunc()
        }
    },[])

    return (
        <div>
            <Header />
            <button onClick={()=>{nav(`/${uname}`)}}>Back</button>
            <p>Lorem ipsum....
            This is a practice question 
            n no of attempts etc....
            </p>
            {questionData.submissionData.length == 0?
            <button onClick={toCodePage}>Attempt Question</button>:<button onClick={toCodePage}>Re-Attempt Question</button>}


        </div>
    )
}
export default QuestionPage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie'
import Header from "../../components/Common/Header";
function QuestionPage(){
    const {uname,qname}= useParams();
    const [questionData , setQuestionData] = useState({})
    const [attempt , setAttempt] = useState("Attempt Problem")
    const nav = useNavigate();

    async function toCodePage(){

        try{
            if(attempt === "Attempt Problem" || attempt === "Re-Attempt Problem"){
                const flag = window.confirm("Sure to start an attempt????")
                if(flag){
                    const createSubmission =  await fetch("http://localhost:4000/submission/solve-question",{
                        method:"POST",
                        body: JSON.stringify({
                            session:Cookies.get("session"),
                            uname: uname,
                            qname:qname
                        }),
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    })
                    const status = await createSubmission.json()
                    if(status.msg){
                        nav(`/${uname}/code/${questionData.questionData.title}`)
                    }
                    else{
                        alert(status.err)
                    }
    
                }
            }
            else if(attempt === "Continue Attempt"){
                const flag = window.confirm("Continue from where you left?")
                if(flag){
                    nav(`/${uname}/code/${questionData.questionData.title}`)
                }
            }
        }
        catch(error){
            alert(error.message)
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
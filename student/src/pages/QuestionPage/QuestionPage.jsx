import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie'
import Header from "../../components/Common/Header";
import ReviewDiv from "../../components/QuestionPageComponents/ReviewDiv";
function QuestionPage(){
    const {uname,qname}= useParams();
    const [questionData , setQuestionData] = useState({})
    const [attempt , setAttempt] = useState("Start New Attempt")
    const [reviewDiv , setReviewDiv] = useState("hidden")
    const nav = useNavigate();

    async function toCodePage(){

        try{
            if(attempt === "Start New Attempt"){
                const flag = window.confirm("Sure to start a new attempt????")
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
            const submissionData = await fetch("http://localhost:4000/basic/question",{
                method:"POST",
                body: JSON.stringify({session:Cookies.get("session"),uname:uname , qname:qname}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await submissionData.json()
            let flag = false
            let flag2 = false
            data.submissionData.map((submission)=>{
                if(submission.status!=="COMPLETED"){
                    flag = true
                }
                else{
                    flag2 = true
                }
            })
            if (flag && attempt!=="Continue Last Attempt"){
                setAttempt("Continue Last Attempt")
            }
            if(flag2 && reviewDiv === "hidden"){
                setReviewDiv("block")
            }
            console.log(JSON.stringify(data))
            setQuestionData(data)
            
        }
        if(Object.keys(questionData).length == 0){
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
            <button onClick={toCodePage}>{attempt}</button>
            <div className={`${reviewDiv}`}>
            {questionData?.submissionData?.map((submission)=>(
                    <ReviewDiv 
                    submission={submission}
                    uname={uname}
                    qname={qname}/>
                ))}
            </div>
                
            

        </div>
    )
}
export default QuestionPage;
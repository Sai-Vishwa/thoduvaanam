import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router-dom";
import QuestionInfo from "../../components/ContestHandler/QuestionInfo";
import Timer from "../../components/CodingPageComponents/Timer";


function ContestHandlerPage(){

    const [questionDetails , setQuestionDetails] = useState({})
    const nav = useNavigate();
    const {uname , tname } = useParams();

    async function fetchData() {
        try{
            const details = await fetch("http://localhost:4000/basic/contest-handle",{
                method:"POST",
                body: JSON.stringify({uname:uname , session:Cookies.get("session") , tname:tname}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await details.json()
        }
        catch(error){
            alert(error.message);
            nav(`/${uname}`)
        }
    }

    useEffect(()=>{
        if(Object.keys(questionDetails)==0){
            fetchData()
        }
    },[])

    return(
        <>
        {JSON.stringify(questionDetails)}

        <Timer 
        minutes={questionDetails.time}/>

        {
            questionDetails?.questions?.map((ques)=>(
                <QuestionInfo 
                question={ques}/>
            ))
        }

        <button onClick={nav(`/${uname}/`)}>back</button>
        </>
    )
}

export default ContestHandlerPage;
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';


function ContestBasicPage(){

    const [contestDetails , setContestDetails] = useState({});
    const [attemptButton , setAttemptButton] = useState("Start New Attempt")
    const [disabled , setDisabled] = useState(false);
    const nav = useNavigate();
    const {uname , tname} = useParams();
    const [reviewDiv , setReviewDiv] = useState(false);


    async function toContestHandler(){
        if(attemptButton === "CONTINUE LAST ATTEMPT"){
            nav(`/${uname}/contest-handler/${tname}`)
        }
        else if(attemptButton === "START NEW ATTEMPT"){
            try{
                const startAttempt = await fetch("http://localhost:4000/submission/start-contest",{
                    method:"POST",
                    body: JSON.stringify({uname:uname , session : Cookies.get("session") , tname:tname}),
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const data = await startAttempt.json();
                if(data.msg){
                    nav(`/${uname}/contest-handler/${tname}`)
                }
                else{
                    throw new Error(data.err)
                }
            }
            catch(error){
                alert(error.message);
            }
        }
    }


    async function fetchData() {

        try{
            const details = await fetch("http://localhost:4000/basic/contest-basic",{
                method:"POST",
                body: JSON.stringify({uname:uname , session : Cookies.get("session") , tname:tname}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await details.json();

            if(data.err){
                throw new Error(data.err)
            }
            else{
                setContestDetails(data.data)

                setAttemptButton(data.status)
                if(data.status === "COMPLETED" || data.status === "ENDED" || data.status === "NOT STARTED"){
                    setDisabled(true)
                }
                if(data.status === "COMPLETED"){
                    setReviewDiv(true)
                }
            }
        }
        catch(error){
            alert(error.message);
            nav(`/${uname}`)
        }
    }

    useEffect (()=>{
        if(Object.keys(contestDetails) == 0){
            fetchData();
        }
    })
    return(<>
            {JSON.stringify(contestDetails)}
            <button onClick={()=>{nav(`/${uname}`)}}>Back</button>
            <button onClick={toContestHandler} className={`disabled:${disabled}`}>{attemptButton}</button>
    </>)
}
export default ContestBasicPage
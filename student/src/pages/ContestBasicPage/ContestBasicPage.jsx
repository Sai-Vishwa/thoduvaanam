import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';


function ContestBasicPage(){

    const [contestDetails , setContestDetails] = useState({});
    const [attemptButton , setAttemptButton] = useState("Start New Attempt")
    const nav = useNavigate();
    const {uname , tname} = useParams();
    const [reviewDiv , setReviewDiv] = useState(false);


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

                
                let flag = false
                let flag2 = false
                if(data.submission == "COMPLETED"){
                    setAttemptButton("Contest attended")
                }
                data.submission.map((sub)=>{
                    if(sub.status!=="COMPLETED"){
                        flag = true
                    }
                    else{
                        flag2 = true
                    }
                })
                if(flag){
                    setAttemptButton("Continue Last Attempt")
                }
                if(flag2){
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
            <button onClick={toContest}>{attemptButton}</button>
    </>)
}
export default ContestBasicPage
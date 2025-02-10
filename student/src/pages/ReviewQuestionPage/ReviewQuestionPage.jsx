import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReviewQuestionPage(){
    const {uname , qname } = useParams()
    const {reviewData , setReviewData} = useState({})
    useEffect(()=>{
        const getData = async() =>{
            const review = await fetch("http://localhost:4000/basic/review-question",{
                method:"POST",
                body: JSON.stringify(loginData),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await otp.json()
            setReviewData(data)
        }

        if(Object.keys(reviewData).length === 0){
            getData()
        }
    },[])
    return (
        <div>
            
        </div>
    )
}
export default ReviewQuestionPage
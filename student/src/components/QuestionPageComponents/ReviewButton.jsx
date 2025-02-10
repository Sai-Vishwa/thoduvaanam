import { useNavigate } from "react-router-dom"

function ReviewButton({submission}){
    const nav = useNavigate();
    function toReviewPage(){
        
    }

    return (
        <div>
            <button onClick={toReviewPage}>Review</button>
        </div>
    )
}

export default ReviewButton
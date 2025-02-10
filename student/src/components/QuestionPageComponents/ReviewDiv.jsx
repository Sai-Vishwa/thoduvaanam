import { useNavigate } from "react-router-dom";

function ReviewDiv({submission , uname  , qname}){
    const nav = useNavigate();

    function toReviewPage(){
        nav(`${uname}/review-question/${qname}`)
    }

    return(
        <div>
            {JSON.stringify(submission)}
            <div>
                <button onClick={toReviewPage}>Review</button>
            </div>
        </div>
    )
}
export default ReviewDiv
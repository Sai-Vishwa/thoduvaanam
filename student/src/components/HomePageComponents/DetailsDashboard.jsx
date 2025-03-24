function DetailsDashBoard({details}){

    return (
        <div>
            {details.type=="none" && 
            <div className="text-black">
                Click on a question / contest to know about it     
            </div>}
            {JSON.stringify(details)}
        </div>
    )
}

export default DetailsDashBoard;
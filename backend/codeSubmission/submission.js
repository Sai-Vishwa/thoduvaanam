async function submission(req,res) {
    try{

    }
    catch(error){
        console.log(error);
        res.status(200).json({
            err:"internal error"
        })
    }
}

module.exports = {
    submission
}
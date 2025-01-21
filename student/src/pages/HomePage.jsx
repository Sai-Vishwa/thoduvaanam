import { useEffect, useState } from "react";
function HomePage({}){
    useEffect(()=>{
        fetch("http://localhost:4000/basic/home",{
            method: 'Post',
            headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            
        })})
          .then((resp)=>{return resp.json()})
          .then(data =>{
            if(data.err){
                alert(data.err)
            }
            else{
                document.cookie = `session=${data.session}; max-age=3600; path=/`
                alert("Login successful");
                nav("/");
            }
          }
        ).catch(err =>{
            console.log(err);
            alert("Some error")
        })
    },[])
    return (<>
    This is the home page
    </>)
}
export default HomePage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HomePage({}){
    const nav = useNavigate();
    const [allData,setAllData] = useState({});
    useEffect(()=>{
        const session = Cookies.get("session");
        if(!session){
            alert("first login to access this route");
            nav("/login-signup")
        }
        else if(allData=={}){
            fetch("http://localhost:4000/basic/home",{credentials:'include'})
              .then((resp)=>{return resp.json()})
              .then(data =>{
                if(data.err){
                    alert(data.err)
                }
                else{
                    setAllData(data)
                }
              }
            ).catch(err =>{
                console.log(err);
                alert("Some error")
            })
        }
    },[])
    return (<>
    {allData}
    </>)
}
export default HomePage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"
function HomePage({}){
    const nav = useNavigate();
    const [allData,setAllData] = useState({});
    // useEffect(()=>{
    //     const session = Cookies.get("session");
    //     if(!session){
    //         alert("first login to access this route");
    //         nav("/login-signup")
    //     }
    //     else if(allData=={}){
    //         fetch("http://localhost:4000/basic/home",{credentials:'include'})
    //           .then((resp)=>{return resp.json()})
    //           .then(data =>{
    //             if(data.err){
    //                 alert(data.err)
    //             }
    //             else{
    //                 setAllData(data)
    //             }
    //           }
    //         ).catch(err =>{
    //             console.log(err);
    //             alert("Some error")
    //         })
    //     }
    // },[])
    return (
    <div className=" container p-4">
      <nav>
        <div className="profile">
        <img src="#"/>
        <p>Update / View </p>
        <div className="search">
            <input type="search" />
        </div>
        </div>
      </nav>
    </div>
    );
}
export default HomePage;
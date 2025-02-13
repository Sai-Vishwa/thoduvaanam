import React, { useRef, useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie"
import Header from "../../components/Common/Header";
import Timer from "../../components/CodingPageComponents/Timer";
import { Editor } from "@monaco-editor/react";

const CodingPage = () => {
    const {uname , tname , qname} = useParams();

    const [lang , setLang] = useState("py")

    const [questionData , setQuestionData] = useState({})



    async function fetchData() {
        try{
            const result = await fetch("http://localhost:4000/basic/coding-page",{
                method:"POST",
                body: JSON.stringify({session:Cookies.get("session") , uname:uname , qname:qname}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await result.json();
            setQuestionData(data.data)
        }
        catch(error){
            alert(error.message)
            nav(`/${uname}/contest-handler/${tname}`)
        }
    }

    useEffect(()=>{
        if(Object.keys(questionData) == 0){
            fetchData();
        }
    })

    return (
        <div>
            {JSON.stringify(questionData)}
            <Timer 
            minutes={questionData.timeLeft}/>
            
            <Editor boiler = {questionData.boiler}/>


        </div>
    )
};

export default CodingPage;

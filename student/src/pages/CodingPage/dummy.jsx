import React, { useState, useEffect } from 'react';
import { Editor } from "@monaco-editor/react";
import { ArrowLeft, Clock, Play, CheckCircle, XCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DummyPage = () => {
  const [count, setCount] = useState({})

  useEffect(()=>{
    console.log("here")
    fetch("http://localhost:4000/admin/load", {
      method: "POST",
      body: "{}",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => res.json())
    .then((data) => {console.log(JSON.stringify(data));setCount(data)})
    .catch(err => console.log(err))
  },[])

  return (
    <>
      {JSON.stringify(count)}
    </>
  )
};

export default DummyPage;
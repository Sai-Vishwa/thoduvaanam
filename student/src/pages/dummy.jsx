import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Luminance from "../luminance";


const TextScramble = () => {
  const [count, setCount] = useState({})

  useEffect(()=>{
    console.log("here")
    fetch("http://localhost:4000/admin/load", {
      method: "POST",
      body: JSON.stringify({}),
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

export default TextScramble;
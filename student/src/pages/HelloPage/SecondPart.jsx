import { AnimatePresence, motion } from "framer-motion"
import { Divide } from "lucide-react"
import { useEffect, useState } from "react"

function SecondPart({isvisible}) {

    const[isImgFixed , setIsImgFixed] = useState(false)
    const[isImgFixed2 , setIsImgFixed2] = useState(false)
    const [text , setText] = useState(false)

    
    let content = ""
    if(isvisible>2500){
        content = `This battlefield is made possible by the Vidamuyarchi of Team Intellexa,
        The OG tech club of Rajalakshmi Engineering College (REC).
        Step in, and let's see if you've got the spirit of a true coder`
    }
    else if(isvisible>1300){
        content = `This is Aadukalam, the DSA battlefield.
        Solve challenges, compete with others, and sharpen your claws with every problem.
        Learn, grow, and prove your skills in a space built for coding cats.`
    }
    else if(isvisible>280){
        content = `I'm Nyx.
        The anchor being of this site.
        Hope you brought more than just curiosity… because that won't get you far.`
        
    }

    
    // if(isvisible>100 && isvisible<400){
            return (
                <div className="flex w-full justify-center items-center font-bold text-xs">

                                <div className="w-1/2 flex items-center justify-end mb-12 xs:hidden sm:hidden md:flex">
                                    <motion.img
                                src="/___o____-removebg-preview.png"
                                initial={{opacity:0 , x:"-100vw"}} 
                                animate={isvisible>100?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:"-100vw"  , y:"-100vh"}}
                                transition={{duration:2, delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed(true)}}
                                className={`w-48 h-48 md:w-64 md:h-64 lg:w-60 lg:h-80  object-cover ${isImgFixed?"fixed":""}`}
                                />
                                </div>

                                <div className="w-1/2 flex items-center justify-start mb-12 xs:hidden sm:hidden md:flex">
                                <motion.img
                                src="/Bullet_journal_doodles-removebg-preview.png"
                                initial={{opacity:0 , x:"100vw"}} 
                                animate={isvisible>250?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:"100vw"  , y:"-100vh"}}
                                transition={isvisible>250?{duration:2, delay:3}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[400px] object-cover ${isImgFixed2?"fixed":""}`}
                                />
                                <div className={`${isvisible>1300?"block":"hidden"}`}>
                                <motion.div
                                initial={{opacity:0 , x:0 , y:"-100vh"}} 
                                animate={isvisible>1300 && isvisible<2500?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={isvisible>1300?{duration:4, delay:5}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[320px] object-cover ${isImgFixed2?"fixed":""} ml-10`}
                                >
                                    {content}
                                </motion.div>
                                </div>
                                <div className={`${isvisible>280 && isvisible<1300?"block":"hidden"}`}>
                                <motion.div
                                initial={{opacity:0 , x:0 , y:"-100vh"}} 
                                animate={isvisible>280?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={isvisible>280?{duration:4, delay:5}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[320px] object-cover ${isImgFixed2?"fixed":""} ml-10`}
                                >
                                    {content}
                                </motion.div>
                                </div>
                                <div className={`${isvisible>2500?"block":"hidden"}`}>
                                <motion.div
                                initial={{opacity:0 , x:0 , y:"-100vh"}} 
                                animate={isvisible>2500?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={isvisible>2500?{duration:4, delay:5}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[320px] object-cover ${isImgFixed2?"fixed":""} ml-10`}
                                >
                                    {content}
                                </motion.div>
                                </div>
                                
                                
                                
                                </div>
                </div>
                
        
            )
    // }
    // else if(isvisible>=200 && isvisible<300){
    //     return (
    //         <div>
    //             2
    //         </div>
    //     )
    // }
    // else if(isvisible>=300 && isvisible<400){
    //     return (
    //         <div>
    //             3
    //         </div>
    //     )
    // }
    // else{
    //     return (
    //         <div>
    //             {isvisible}
    //         </div>
    //     )
    // }
}

export default SecondPart
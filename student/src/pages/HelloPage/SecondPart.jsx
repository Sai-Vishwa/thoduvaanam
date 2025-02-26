import { AnimatePresence, motion } from "framer-motion"
import { Divide } from "lucide-react"
import { useEffect, useState } from "react"

function SecondPart({isvisible}) {

    const[isImgFixed , setIsImgFixed] = useState(false)
    const[isImgFixed2 , setIsImgFixed2] = useState(false)
    const [textBox , setTextBox] = useState(false)
    const [text1 , setText1] = useState(0)

    const text1Data = `I'm Nyx. The anchor being of this site. Hope you brought more than just curiosity… because that won't get you far.`

    const text1DataArr = text1Data.split("");

    const animateNo = (isvisible -(500 + 8*text1))/8

    // if(animateNo<0){
    //     setIn(false)
    // }
    
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
    

    
    // if(isvisible>100 && isvisible<400){
            return (
                <div className="flex w-full justify-center items-center font-bold text-xs">

                                <div className="w-1/2 flex items-center justify-end mb-12 xs:hidden sm:hidden md:flex">
                                    <motion.img
                                src="/___o____-removebg-preview.png"
                                initial={{opacity:0 , x:"-100vw"}} 
                                animate={isvisible>180?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:"-100vw"  , y:"-100vh"}}
                                transition={{duration:2, delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed(true)}}
                                className={`w-48 h-48 md:w-64 md:h-64 lg:w-60 lg:h-80  object-cover ${isImgFixed?"fixed":""}`}
                                />
                                </div>

                                <div className="w-1/2 flex items-center justify-start mb-12 xs:hidden sm:hidden md:flex">
                                {/* <motion.img
                                src="/Bullet_journal_doodles-removebg-preview.png"
                                initial={{opacity:0 , x:"100vw"}} 
                                animate={isvisible>350?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:"100vw"  , y:"-100vh"}}
                                transition={isvisible>350?{duration:2, delay:3}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[400px] object-cover ${isImgFixed2?"fixed":""}`}
                                /> */}
                                {/* <div>
                                <motion.div
                                initial={{opacity:0 , x:0 , y:"-100vh"}} 
                                animate={isvisible>1300 && isvisible<2500?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={isvisible>1300 && isvisible<2500?{duration:3}:{duration:2,delay:0}}
        
                                className={`w-[320px] object-cover ${isImgFixed2?"fixed":""} ml-10`}
                                >
                                    {`This is Aadukalam, the DSA battlefield.
        Solve challenges, compete with others, and sharpen your claws with every problem.
        Learn, grow, and prove your skills in a space built for coding cats.`}
                                </motion.div>
                                </div> */}
                                
                                <motion.div className={`${textBox==true?"fixed":""} w-[350px] h-[200px] border-2 border-[#000015] block space-y-3`}
                                initial={{opacity:0 , x:0}} 
                                animate={isvisible>600?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={ isvisible>600?{duration:2}:{duration:1}}
                                onAnimationComplete={()=>{setTextBox(true)}}>
                                    <div className="flex -space-x-1 ml-2 mt-2">

                                    {
                                        text1DataArr.map((chr , index)=>(
                                            (index<8)?
                                            (index<text1)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo)?(<></>):(
                                                <motion.div
                                                initial={{opacity:0,x:0}}
                                                animate={{ opacity:1 , x:0 , y:"0vh" }}
                                                transition={{  duration: 1 }}
                                                className="w-[12px] h-[12px]"
                                                >
                                                    {chr}
                                                </motion.div>
                                            ):(<></>)
                                        ))}
                                        <div>
                                        {
                                        (animateNo<8)?(
                                            <motion.div
                                            className="ml-1"
      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      |
    </motion.div>
                                        ):(<></>)
                                    }
                                        </div>
                                  
                                    </div>
                                    <div className="flex -space-x-1 ml-2">
                                    {
                                        text1DataArr.map((chr , index)=>(
                                            (index>8 && index<38)?
                                            (index<text1)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo)?(<></>):(
                                                <motion.div
                                                initial={{opacity:0,x:0}}
                                                animate={{ opacity:1 , x:0 , y:"0vh" }}
                                                transition={{  duration: 1 }}
                                                className="w-[12px] h-[12px]"
                                                >
                                                    {chr}
                                                </motion.div>
                                            ):(<></>)
                                        ))
                                       
                                    }
                                    <div>
                                        {
                                        (animateNo>8 && animateNo<38)?(
                                            <motion.div
                                            className="ml-1"

      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      |
    </motion.div>
                                        ):(<></>)
                                    }
                                        </div>
                                    </div>
                                    <div className="flex -space-x-1 ml-2">
                                    {
                                        text1DataArr.map((chr , index)=>(
                                            (index>39 && index<82)?
                                            (index<text1)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo)?(<></>):(
                                                <motion.div
                                                initial={{opacity:0,x:0}}
                                                animate={{ opacity:1 , x:0 , y:"0vh" }}
                                                transition={{  duration: 1 }}
                                                className="w-[12px] h-[12px]"
                                                >
                                                    {chr}
                                                </motion.div>
                                            ):(<></>)
                                        ))
                                        
                                    }
                                    <div>
                                        {
                                        (animateNo>39 && animateNo<82)?(
                                            <motion.div
                                            className="ml-1"

      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      |
    </motion.div>
                                        ):(<></>)
                                    }
                                        </div>
                                    </div>

                                    <div className="flex -space-x-1 ml-2">
                                    {
                                        text1DataArr.map((chr , index)=>(
                                            (index>84)?
                                            (index<text1)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo)?(<></>):(
                                                <motion.div
                                                initial={{opacity:0,x:0}}
                                                animate={{ opacity:1 , x:0 , y:"0vh" }}
                                                transition={{  duration: 1 }}
                                                className="w-[12px] h-[12px]"
                                                >
                                                    {chr}
                                                </motion.div>
                                            ):(<></>)
                                        ))
                                        
                                    }
                                    <div>
                                        {
                                        (animateNo>84)?(
                                            <motion.div
                                            className="ml-1"

      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      |
    </motion.div>
                                        ):(<></>)
                                    }
                                        </div>
                                    </div>

                                       
                                </motion.div>
{/*                                 
                                     */}
                               
                                {/* <div className={``}>
                                <motion.div
                                initial={{opacity:0 , x:0 , y:"-100vh"}} 
                                animate={isvisible>2500?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:0  , y:"-100vh"}}
                                transition={isvisible>2500?{duration:4, delay:5}:{duration:2,delay:0}}
                                onAnimationComplete={()=>{setIsImgFixed2(true);setText(true)}}
                                className={`w-[320px] object-cover ${isImgFixed2?"fixed":""} ml-10`}
                                >
                                    {content}
                                </motion.div>
                                </div> */}
                                
                                
                                
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
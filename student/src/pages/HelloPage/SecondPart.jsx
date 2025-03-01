import { AnimatePresence, motion } from "framer-motion"
import { Divide } from "lucide-react"
import { useEffect, useState } from "react"

function SecondPart({isvisible}) {

    const[isImgFixed , setIsImgFixed] = useState(false)
    const[isImgFixed2 , setIsImgFixed2] = useState(false)
    const [textBox , setTextBox] = useState(false)
    const [text1 , setText1] = useState(0)
    const [text2, setText2] = useState(0)
    const [text3, setText3] = useState(0)
    const [text1Hide , setText1Hide] = useState(true)
    const [text2Hide , setText2Hide] = useState(true)
    const [text3Hide , setText3Hide] = useState(true)



    const text1Data = `I'm Nyx. The anchor being of this site. Hope you brought more than just curiosity because that won't get you far.`
    const text2Data = `This is Aadukalam, the DSA battlefield. Solve challenges, compete with others, and sharpen your claws with every problem. Learn, grow, and prove your skills.`
    const text3Data = `This battlefield is made possible by the Vidamuyarchi of Team Intellexa, The OG tech club of REC.`

    const text1DataArr = text1Data.split("");
    const text2DataArr = text2Data.split("");
    const text3DataArr = text3Data.split("");

    const animateNo = (isvisible -(650 + 8*text1))/8
    const animateNo2 = (isvisible -(1650 + 8*text2))/8
    const animateNo3 = (isvisible -(2950 + 8*text3))/8

    

    
    return (
        <div className="block w-full m-0 p-0">
        <div className="flex w-full justify-center items-center font-bold text-xs">

            <div className="w-1/2 flex items-center justify-end mb-12 xs:hidden sm:hidden md:flex">
                            <motion.img
                        src="/___o____-removebg-preview.png"
                        initial={{opacity:0 , x:"-100vw"}} 
                        animate={isvisible>180?{opacity:1 , x:0 , y:"-60vh"}:{opacity:0,x:"-100vw"  , y:"-100vh"}}
                        transition={{duration:2, delay:0}}
                        onAnimationComplete={()=>{setIsImgFixed(true)}}
                        className={`w-48 h-48 md:w-64 md:h-64 lg:w-60 lg:h-80  object-cover ${isImgFixed?"fixed":""}`}
                        />
            </div>

            <div className="w-full flex items-center justify-center mb-12 xs:hidden sm:hidden md:flex text-lg">
                               
                
                    <motion.div className={`${textBox==true?"fixed":""} w-[750px] h-[240px]  flex`}
                        initial={{opacity:0 , x:"100vw"}} 
                        animate={isvisible>600?{opacity:1 , x:0 , y:"-60vh"}:{opacity:0,x:"100vw"  , y:"-100vh"}}
                        transition={ isvisible>600?{duration:2}:{duration:1}}
                        onAnimationComplete={()=>{setTextBox(true)}}>


                            <motion.div className={`block space-y-3 ${text1Hide==true || text2Hide==false || text3Hide==false?"hidden":""}`}
                                initial={{opacity:0,x:0}}
                                animate={isvisible>650 && isvisible<1650?{opacity:1,x:0}:{opacity:0,x:0}}
                                transition={isvisible>650 && isvisible<1650?{duration:0.5}:{duration:0.5}}
                                onAnimationComplete={()=>{
                                    if(isvisible>650 && isvisible<1650){
                                        setText1Hide(false)
                                    }
                                    else{
                                        setText1Hide(true)
                                    }
                                }}>
                                    
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
                                            (index>81)?
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
                                        (animateNo>81)?(
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

                                            {/*here*/}



                        <motion.div className={`block space-y-3 ${text2Hide==true || text1Hide==false || text3Hide==false?"hidden":""}`}
                                initial={{opacity:0,x:0}}
                                animate={isvisible>1650 && isvisible<2950?{opacity:1,x:0}:{opacity:0,x:0}}
                                transition={isvisible>1650 && isvisible<2950?{duration:0.5 , delay:0}:{duration:0.5}}
                                onAnimationComplete={()=>{
                                    if(isvisible>1650 && isvisible<2950){
                                        setText2Hide(false)
                                    }
                                    else{
                                        setText2Hide(true)
                                    }
                                }}>
                                    
                                    <div className="flex -space-x-1 ml-2 mt-2">

                                    {
                                        text2DataArr.map((chr , index)=>(
                                            (index<39)?
                                            (index<text2)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo2)?(<></>):(
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
                                                (animateNo2<39)?(
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
                                        text2DataArr.map((chr , index)=>(
                                            (index>39 && index<78)?
                                            (index<text2)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo2)?(<></>):(
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
                                        (animateNo2>39 && animateNo2<78)?(
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
                                        text2DataArr.map((chr , index)=>(
                                            (index>78 && index<121)?
                                            (index<text2)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo2)?(<></>):(
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
                                        (animateNo2>78 && animateNo2<121)?(
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
                                        text2DataArr.map((chr , index)=>(
                                            (index>121)?
                                            (index<text2)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo2)?(<></>):(
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
                                        (animateNo2>121)?(
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


                        {/*here again */}



                        <motion.div className={`block space-y-3 ${text3Hide==true || text1Hide==false || text2Hide==false?"hidden":""}`}
                                initial={{opacity:0,x:0}}
                                animate={isvisible>2950?{opacity:1,x:0}:{opacity:0,x:0}}
                                transition={isvisible>2950?{duration:1 , delay:2}:{duration:0.5}}
                                onAnimationComplete={()=>{
                                    if(isvisible>2950){
                                        setText3Hide(false)
                                    }
                                    else{
                                        setText3Hide(true)
                                    }
                                }}
                                >
                                    
                                    <div className="flex -space-x-1 ml-2 mt-2">

                                    {
                                        text3DataArr.map((chr , index)=>(
                                            (index<17)?
                                            (index<text3)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo3)?(<></>):(
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
                                                (animateNo3<17)?(
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
                                        text3DataArr.map((chr , index)=>(
                                            (index>16 && index<40)?
                                            (index<text3)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo3)?(<></>):(
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
                                        (animateNo3>16 && animateNo3<40)?(
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
                                        text3DataArr.map((chr , index)=>(
                                            (index>40 && index<56)?
                                            (index<text3)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo3)?(<></>):(
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
                                        (animateNo3>40 && animateNo3<54)?(
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
                                        text3DataArr.map((chr , index)=>(
                                            (index>56)?
                                            (index<text3)?(
                                                <div className="w-[12px] h-[12px]">{chr}</div>
                                            ):(index>animateNo3)?(<></>):(
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
                                        (animateNo3>54)?(
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


                        
                                       
            </motion.div>
            
    </div>
    
</div>
</div>

)
   
}

export default SecondPart
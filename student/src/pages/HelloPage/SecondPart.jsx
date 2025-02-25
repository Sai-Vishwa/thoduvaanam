import { AnimatePresence, motion } from "framer-motion"
import { Divide } from "lucide-react"
import { useEffect, useState } from "react"

function SecondPart({isvisible}) {

    const[isImgFixed , setIsImgFixed] = useState(false)
    
    // if(isvisible>100 && isvisible<400){
            return (
                <div className="flex items-center justify-center mb-12 xs:hidden sm:hidden md:flex">
                    <motion.img
                src="/___o____-removebg-preview.png"
                initial={{opacity:0 , x:"-100vw"}} 
                animate={isvisible>100?{opacity:1 , x:0 , y:"-100vh"}:{opacity:0,x:"-100vw"  , y:"-100vh"}}
                transition={{duration:2, delay:0}}
                onAnimationComplete={()=>{setIsImgFixed(true)}}
                className={`w-48 h-48 md:w-64 md:h-64 lg:w-60 lg:h-80  object-cover ${isImgFixed?"fixed":""}`}
                />
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
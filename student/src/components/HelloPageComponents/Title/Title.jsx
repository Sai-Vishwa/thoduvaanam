import { motion } from 'framer-motion';
function Title({isvisible}){
    return (
        <div className='out w-full h-full flex items-center justify-center mb-0'>
            <motion.div className='in w-full h-full flex items-center justify-center mb-0' 
            initial={{y:500, opacity:0}} 
            animate={isvisible?{y:0,opacity:1}:{y:-500 , opacity:0}}
            transition={isvisible?{duration:1.5,delay:0}:{duration:1 , ease:"easeOut"}}>
                Aadukalam
            </motion.div>
        </div>
    )

}

export default Title
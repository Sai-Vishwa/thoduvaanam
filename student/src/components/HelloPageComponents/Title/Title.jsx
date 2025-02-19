import { motion } from 'framer-motion';
function Title(){
    return (
        <div className='out w-full h-full flex items-center justify-center mb-0'>
            <motion.div className='in w-full h-full flex items-center justify-center mb-0' 
            initial={{y:500, opacity:0}} 
            animate={{y:0,opacity:1}}
            transition={{duration:1.5,delay:0}}>
                Aadukalam
            </motion.div>
        </div>
    )

}

export default Title
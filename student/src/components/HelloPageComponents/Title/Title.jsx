import { motion } from 'framer-motion';
function Title({isvisible}){
    return (
        <div className='out w-full h-full flex items-center justify-center mb-0'>
            <motion.div className='in w-full h-full flex items-center justify-center mb-0' 
            initial={{ opacity:0}} 
            animate={isvisible?{opacity:[0,1]}:{ opacity:[1,0]}}
            transition={isvisible?{duration:2,delay:0 , ease:"circIn"}:{duration:1 , ease:"circIn"}}>
                <p className='glitch' data-glitch="AADUKALAM">AADUKALAM</p>
            </motion.div>
        </div>
    )

}

export default Title
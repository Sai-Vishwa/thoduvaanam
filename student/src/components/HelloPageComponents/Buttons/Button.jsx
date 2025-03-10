import { motion } from "framer-motion";
import "./Button.scss";
import { useNavigate } from "react-router-dom";

function Button({isvisible}) {
    const nav = useNavigate();
    return (
        <div className="flex w-full h-full items-center text-lg justify-evenly mt-5">
            <motion.div 
                className=""
                initial={{ x: -100, opacity: 0 }}
                animate={isvisible?{ x: 0, opacity: 1 }:{opacity:0 , x:-100}}
                transition={isvisible?{ duration: 1, ease: "easeOut", delay: 2 }:{duration:1 , ease:'easeOut'}}
            >
                <div ><a class="click-btn btn-style3" onClick={()=>{nav("/login")}} href="#">LOGIN</a></div>
                {/* <span className="mas">LOGIN</span>
                <button type="button" name="Hover"  onClick={()=>{nav("/login")}}>LOGIN</button> */}
            </motion.div>
 
            <motion.div 
                className="button-container-2"
                initial={{ x: 100, opacity: 0 }}
                animate={isvisible?{ x: 0, opacity: 1 }:{opacity:0  , x:100}}
                transition={isvisible?{ duration: 1, ease: "easeOut", delay: 2 }:{duration:1 , ease:'easeOut'}}
            >
                                <div ><a class="click-btn btn-style3" onClick={()=>{nav("/signup")}} href="#">SIGNUP</a></div>

                {/* <span className="mas">SIGN UP</span>
                <button type="button" name="Hover" onClick={()=>{nav("/signup")}}>SIGN UP</button> */}
            </motion.div>
        </div>
    );
}

export default Button;

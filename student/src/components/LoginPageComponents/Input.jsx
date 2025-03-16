import SubmitButton from "./SubmitButton";
import { motion , AnimatePresence} from "framer-motion";

function Input({setLoginData , loginData , loginError , forgotPassword , setLoginError , setLoading , setForgotPassword, setOTPdiv , disable , setDisable}){


    const toggleForgotPassword = () => {
        setForgotPassword(prev => ({
          val: prev.style === "block" ? "Remember password?" : "Forgot password?",
          style: prev.style === "block" ? "hidden" : "block"
        }));
        setLoginError({ ...loginError, passwordError: "" });
      };



    return (
        <>
        <motion.div 
          className="space-y-4 flex flex-col j"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <input
              type="text"
              placeholder="Registration Number" disabled={disable}
              plac
              value={loginData.rno}
              onChange={(e) => setLoginData({ ...loginData, rno: e.target.value })}
              className=" w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef]  rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef]"
            />
          </div>

          <AnimatePresence mode="wait">
            {forgotPassword.style === "block" ? (
              <motion.div
                key="password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  disabled={disable}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border placeholder-[#ddf3ef]  border-[#ddf3ef] rounded-lg focus:outline-none focus:ring-2 focus:border-0 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] "
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

            <SubmitButton 
            loginData={loginData}
            forgotPassword={forgotPassword}
            setOTPdiv={setOTPdiv}
            disable={disable}
            setDisable={setDisable}/>

            <div className="flex justify-center items-center">
            <motion.button
            layout
            onClick={toggleForgotPassword}
            className={`w-fit text-[#ddf3ef] text-sm basic-1  hover:text-[#2bbdaa] transition-colors font-mono mt-2 ${disable==true?"hidden":"block"}`}
            whileHover={{ scale: 1.02 }}
          >
            {forgotPassword.val}
          </motion.button>
            </div>
          
        </motion.div>
        </>
    )
}
export default Input;
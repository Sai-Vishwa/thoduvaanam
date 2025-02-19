import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SubmitButton({loginData , loginError , setLoginError , setLoading , forgotPassword}){

    const nav = useNavigate();

    const handleLogin = async () => {

        let flag = false
        let rnoError = ""
        let passwordError = ""
        if(!/^2[234]\d{7}$/.test(loginData.rno)){
            rnoError = "*Enter a valid Roll No"
            flag = true
        }

        if(!loginData.password ){
            passwordError = "*Enter a valid password"
            flag = true
        }

        if(flag){
            setLoginError({rnoError:rnoError,passwordError:passwordError})
            return
        }

        try {
            setLoading(true)
          const response = await fetch("http://localhost:4000/login-signup/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          const data = await response.json();
          if (data.msg) {
            setLoading(false)
            alert("Login successful");
            nav(`/${data.uname}`);
          }
          else{
            throw new Error(data.err)
          }
        } catch (error) {
            setLoading(false)
          alert(error.message);
        }
      };

      const handleSendOTP = async () => {
        if (!/^2[234]\d{7}$/.test(loginData.rno)) {
          setLoginError({ ...loginError, rnoError: "*Enter a valid Roll no" });
          return;
        }
    
        try {
            setLoading(true)
          const response = await fetch("http://localhost:4000/login-signup/forgot-password", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          const status = await response.json();
          if (status.msg) {
            alert("OTP sent successfully");
            setLoading(false)
            setOTPdiv("block");
          }
          else{
            throw new Error(data.err)
          }
        } catch (error) {
            setLoading(false)

          alert(error.message);
        }
      };


    return (
        <>
            <motion.button
            layout
            onClick={forgotPassword.style === "block" ? handleLogin : handleSendOTP}
            className="w-full bg-[#000015] text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-mono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {forgotPassword.style === "block" ? "Login" : "Send OTP"}
          </motion.button>
        </>
    )
}

export default SubmitButton
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import {ExternalLink } from 'lucide-react';

import { 
  ChevronDown, 
  Home, 
  Users, 
  Trophy, 
  User, 
  Download, 
  Medal, 
  Target, 
  Crown,
  Code,
  Book,
  Flame,
  GitCommit
} from "lucide-react";
import Header from "../LoginPageComponents/Header";


const FlipDigit = ({ value, isLast = false }) => {
    const [prevValue, setPrevValue] = useState(value);
    const [isAnimating, setIsAnimating] = useState(false);
    
    useEffect(() => {
      if (value !== prevValue) {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setPrevValue(value);
          setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [value, prevValue]);
  
    return (
      <div className="relative w-2 h-4 inline-block  overflow-hidden">
        <motion.div
          className=" flex items-center justify-center  text-white "
          initial={{ y: isAnimating ? '-100%' : 0 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {value}
        </motion.div>
        {isAnimating && (
          <motion.div
            className="flex items-center justify-center  text-white"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {prevValue}
          </motion.div>
        )}
      </div>
    );
  };
  
  // Animated counter with countdown effect from 999
  const CountdownCounter = ({ end, duration = 3, prefix = '', suffix = '' ,flag}) => {
    const [displayValue, setDisplayValue] = useState(end+50);
    
    useEffect(() => {
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function for smoother animation
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        const easedProgress = easeOutQuart(progress);
        
        // Calculate current value by counting down from 999
        const current = Math.max(
          end,
          Math.floor(end+50 - easedProgress * (end+50 - end))
        );
        
        setDisplayValue(current);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);
    
    // Convert number to array of digits and pad to ensure 3 digits


    const digits = displayValue.toString().padStart(3, flag).split('');
    
    return (
      <div className="flex w-full h-full items-center justify-center text-xs space-x-0">
        {prefix}
        <div className="space-x-0 flex">
        {digits.map((digit, index) => (
          
          <FlipDigit 
            key={index} 
            value={digit} 
            isLast={index === digits.length - 1} 
          />
        ))}
        </div>
        {suffix}
      </div>
    );
  };
  


function DashBoardProfile({userData}){

    const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  

  
  const data = { ...userData };
  

  // console.log(JSON.stringify(data))
  
  return (
    <div className="flex justify-center items-center h-full w-full font-['Yu_Gothic']">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-5/6 h-5/6 pt-2 flex flex-col space-y-3 rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] overflow-hidden shadow-2xl "
      >
        
                <div className="flex">
        
                            <div className="flex flex-col space-y-0 w-1/2 items-center">
                                <div className="text-[#22bdaa] text-lg">{data.name}</div>
                                <div className="text-[#ddf3ea] text-xs">{data.rno}</div>
                            </div>


                                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-col space-y-1 justify-end  items-center w-1/2 ">

                                    <div className="flex space-x-2 items-center">
                                          <Crown className="h-3 w-3 text-[#2bbdaa]" />
                                          <div className="text-[#ddf3ef]  text-sm">Rank</div>
                                    </div>
                                    <div className="flex space-x-0 items-center justify-center ">
                                    
                                                <div className="text-[#2bbdaa] font-bold text-xs">#</div>
                                                <CountdownCounter end={data.rank} duration={5} flag={0}/>
                                                <div className="text-[#2bbdaa] font-bold text-xs">/</div>
                                                <CountdownCounter end={data.totalRank} duration={0.0000001} flag={0}/>
                                    </div>

                                </motion.div>

                                    

                            

                </div>
                <div className="flex">

                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-col space-y-1  items-center w-1/2  ">

                                    <div className="flex space-x-2 items-center">
                                          <Medal className="h-3 w-3 text-[#2bbdaa]" />
                                          <div className="text-[#ddf3ef]  text-sm">Total Pts</div>
                                    </div>
                                    <div className="flex space-x-0 items-center justify-center ">
                                    
                                                <div className="text-[#2bbdaa] font-bold text-xs">#</div>
                                                <CountdownCounter end={data.totalPoints} duration={5} flag={0}/>

                                    </div>

                                </motion.div>
                                
                                
                                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-col space-y-1  items-center w-1/2 ">

                                    <div className="flex space-x-2 items-center">
                                          <Trophy className="h-3 w-3 text-[#2bbdaa]" />
                                          <div className="text-[#ddf3ef]  text-sm">Contests Won</div>
                                    </div>
                                    <div className="flex space-x-0 items-center justify-center ">
                                    
                                                <div className="text-[#2bbdaa] font-bold text-xs">#</div>
                                                <CountdownCounter end={data.totalContestWon} duration={5} flag={0}/>
                      
                                    </div>

                                </motion.div>

                </div>

                <div className="flex justify-around">


                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-col space-y-1 items-center w-1/2">

                                    <div className="flex space-x-2 items-center">
                                          <Flame className="h-3 w-3 text-[#2bbdaa]" />
                                          <div className="text-[#ddf3ef]  text-sm">Submit Streak</div>
                                    </div>
                                    <div className="flex space-x-0 items-center justify-center ">
                                    
                                                <div className="text-[#2bbdaa] font-bold text-xs">#</div>
                                                <CountdownCounter end={data.currentStreak} duration={5} flag={0}/>

                                    </div>

                                </motion.div>
                                
                                
                                <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-col space-y-1 items-center w-1/2">

                                    <div className="flex space-x-2 items-center">
                                          <Crown className="h-3 w-3 text-[#2bbdaa]" />
                                          <div className="text-[#ddf3ef]  text-sm">Participation</div>
                                    </div>
                                    <div className="flex space-x-0 items-center justify-center ">
                                    
                                                <div className="text-[#2bbdaa] font-bold text-xs">#</div>
                                                <CountdownCounter end={data.totalContestsParticipated} duration={5} flag={0}/>
                      
                                    </div>

                                </motion.div>

                </div>




          
          
          {/* <div className="grid grid-cols-12 gap-4 mb-8">
            
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="col-span-12 md:col-span-8 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                  <Medal className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-400 text-sm font-mono">
                    Total Points
                  </div>
                  <div className="font-bold text-white text-3xl mt-1">
                    <CountdownCounter end={data.points || 0} duration={3} flag={"_"}/>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="col-span-12 md:col-span-6 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 shadow-md">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-400 text-sm font-mono">
                    Questions Solved
                  </div>
                  <div className="font-bold text-white text-3xl mt-1">
                    <CountdownCounter end={data.questionsSolved || 0} duration={3} flag={"_"}/>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="col-span-12 md:col-span-6 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-600 shadow-md">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-400 text-sm font-mono">
                    Contests Participated
                  </div>
                  <div className="font-bold text-white text-3xl mt-1">
                    <CountdownCounter end={data.contestsParticipated || 0} duration={3} flag={"_"}/>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="col-span-6 md:col-span-6 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 shadow-md">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-400 text-sm font-mono">
                    Current Streak
                  </div>
                  <div className="font-bold text-white text-2xl mt-1">
                    <CountdownCounter end={data.currentStreak || 0} duration={3} suffix=" days" flag={"_"}/>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="col-span-6 md:col-span-6 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 shadow-md">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-400 text-sm font-mono">
                    Max Streak
                  </div>
                  <div className="font-bold text-white text-2xl mt-1">
                    <CountdownCounter end={data.maxStreak || 0} duration={3} suffix=" days" flag={"_"}/>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="pt-4 border-t border-gray-700"
          >
            {data.leetCodeProfile ? (
              <a
                href={data.leetCodeProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-white text-sm font-bold flex items-center font-mono group transition-all"
              >
                <GitCommit className="w-4 h-4 mr-2" />
                <span>LeetCode Profile</span>
                <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <span className="text-gray-500 text-sm font-bold flex items-center font-mono">
                <GitCommit className="w-4 h-4 mr-2" />
                <span>No LeetCode profile</span>
              </span>
            )}
          </motion.div>8*/}
          <div className="flex justify-center items-center">

          {userData?.leetCodeProfile?.length > 0 ? (
            <a
            href={userData.leetCodeProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2bbdaa] hover:text-[#ddf3ef] text-sm font-bold flex items-center font-mono"
            >
                          <span>{userData.leetCodeProfile}</span>
                        </a>
                      ) : (
                        <span className="text-[#ddf3ef]/50 text-sm font-bold flex items-center font-mono">
                          No LeetCode profile
                        </span>
                      )}
                      </div>
      </motion.div>
    </div>
  );

}

export default DashBoardProfile;
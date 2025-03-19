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
      <div className="relative w-6 h-8 inline-block mx-0.5 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white rounded-sm"
          initial={{ y: isAnimating ? '-100%' : 0 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {value}
        </motion.div>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white rounded-sm"
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
  const CountdownCounter = ({ end, duration = 3, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(999);
    
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
          Math.floor(999 - easedProgress * (999 - end))
        );
        
        setDisplayValue(current);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);
    
    // Convert number to array of digits
    const digits = displayValue.toString().split('');
    
    return (
      <div className="font-mono tabular-nums">
        {prefix}
        {digits.map((digit, index) => (
          <FlipDigit 
            key={index} 
            value={digit} 
            isLast={index === digits.length - 1} 
          />
        ))}
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
  
  return (
    <div className="flex justify-center items-center h-full w-full py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-2/3 rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] overflow-hidden shadow-2xl "
      >
        <div className="py-4 px-6">
          {/* Header with Name and RNO */}
          <div className="flex items-start mb-6">
            <div className="flex-grow">
             <Header 
             data1={``+JSON.stringify(data.name)}
             data2={""+JSON.stringify(data.rno)}
             type={"text-[24px]"}
            type2={"text-[14px]"}
            val={true}/>
            </div>
          </div>
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            {/* Rank - Box style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="col-span-12 md:col-span-4 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="h-10 w-10 rounded-md mb-3 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div className="font-medium text-gray-400 text-sm font-mono">
                Current Rank
              </div>
              <div className="font-bold text-white text-2xl mt-1">
                <span className="text-purple-400 mr-1">#</span>
                <CountdownCounter end={data.rank || 0} duration={3} />
              </div>
            </motion.div>
            
            {/* Points - Larger size */}
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
                    <CountdownCounter end={data.points || 0} duration={3} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Questions Solved - Larger size */}
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
                    <CountdownCounter end={data.questionsSolved || 0} duration={3} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contests - Smaller size */}
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
                    <CountdownCounter end={data.contestsParticipated || 0} duration={3} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Current Streak - Smaller size */}
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
                    <CountdownCounter end={data.currentStreak || 0} duration={3} suffix=" days" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Max Streak - Smaller size */}
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
                    <CountdownCounter end={data.maxStreak || 0} duration={3} suffix=" days" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* LeetCode Profile Link */}
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

}

export default DashBoardProfile;
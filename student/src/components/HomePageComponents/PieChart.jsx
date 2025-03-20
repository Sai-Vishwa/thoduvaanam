import React from 'react';
import { motion } from 'framer-motion';
import { Divide } from 'lucide-react';

const PieChart = ({details}) => {
  // Data setup with aesthetic colors
  const data = [
    { category: 'Easy', total: 8, solved: 2, color: '#3aff4e' },
    { category: 'Hell', total: 2, solved: 1, color: '#ff0000' },
    { category: 'Balanced', total: 4, solved: 1, color: '#ffba30' },
    { category: 'Intense', total: 4, solved: 0, color: '#ff5c4a' },
  ];
  
  const totalProblems = data.reduce((sum, item) => sum + item.total, 0);
  const solvedProblems = data.reduce((sum, item) => sum + item.solved, 0);
  
  // TUTORIAL - STEP 1: Setting the ring thickness
  // The ring thickness is determined by the difference between innerRadius and outerRadius
  // Smaller difference = thinner ring, larger difference = thicker ring
  const innerRadius = 60; // Inner circle radius
  const outerRadius = 62; // Outer circle radius
  // The thickness is (outerRadius - innerRadius) = 15 units
  
  // Calculate percentage and angles for pie segments
  const calculateAngles = () => {
    let currentAngle = 0;
    const segments = [];
    
    data.forEach(item => {
      const angle = (item.total / totalProblems) * 360;
      segments.push({
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        midAngle: currentAngle + (angle / 2)
      });
      currentAngle += angle;
    });
    
    return segments;
  };
  
  const segments = calculateAngles();
  
  // TUTORIAL - STEP 2: Polar to Cartesian conversion
  // This is how we convert angles to x,y coordinates on the circle
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    // Convert degrees to radians and adjust by 90 degrees (to start from top)
    const angleInRadians = (angleInDegrees + 20) * Math.PI / 180.0;
    return {
      // Use cosine for x coordinate, sine for y coordinate
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  // TUTORIAL - STEP 3: Creating the ring segments
  // This function creates the SVG path for a ring segment
  const createArc = (segment, innerRadius, outerRadius) => {
    // Get coordinates for the inner and outer points of the arc
    const startInner = polarToCartesian(100, 100, innerRadius, segment.startAngle);
    const endInner = polarToCartesian(100, 100, innerRadius, segment.endAngle);
    const startOuter = polarToCartesian(100, 100, outerRadius, segment.startAngle);
    const endOuter = polarToCartesian(100, 100, outerRadius, segment.endAngle);
    
    const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? "0" : "1";
    
    // SVG path to create a ring segment
    return [
      "M", startOuter.x, startOuter.y, // Move to start point on outer circle
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, endOuter.x, endOuter.y, // Outer arc
      "L", endInner.x, endInner.y, // Line to inner circle
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, startInner.x, startInner.y, // Inner arc (reverse)
      "Z" // Close path
    ].join(" ");
  };

  
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-full h-full flex justify-center items-center">
        <motion.div 
        className="w-5/6 h-5/6 flex  justify-start rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] overflow-hidden shadow-2xl " 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <svg viewBox="0 0 200 200" className="">
            
            
            {/* Thin Ring Segments */}
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                d={createArc(segment, innerRadius, outerRadius)} // Using our defined constants for consistency
                fill={segment.color}
                strokeWidth="0.5"
                stroke="#000"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="drop-shadow-md bg-[#ff5c4a]"
              />
            ))}
            
            
            
            
            
            {/* Central text */}
            <motion.text
              x="100"
              y="95"
              textAnchor="middle"
              className={"text-xs"}
              fill={"#ddf3ef"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Problems Solved
            </motion.text>
            
            <motion.text
              x="100"
              y="115"
              textAnchor="middle"
              className={"text-base"}
              fill="#ddf3ef"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
                
              {solvedProblems}/{totalProblems}
            </motion.text>
          </svg>
          <motion.div className='flex flex-col justify-center items-start mr-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}>

                {
                    segments.map((segment , index)=>(
                        <div className='flex justify-center items-center space-x-2 text-xs text-[#ddf3ef]'>
                    <div className={`h-2 w-2 rounded-sm bg-[${segment.color}]`}></div>
                    <div >{segment.category.toLowerCase()}-{segment.solved}/{segment.total}</div>
                        </div>
                    ))
                }


                

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PieChart;
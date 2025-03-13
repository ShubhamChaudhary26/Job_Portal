import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <motion.div 
      className="max-w-7xl mx-auto my-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title with Bounce Effect */}
      <motion.h1 
        className="text-4xl font-bold"
        initial={{ y: -10 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </motion.h1>

      {/* Job Cards with Slide-in Effect */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.length === 0 ? (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No Job Available
          </motion.span>
        ) : (
          (allJobs || []).slice(0, 6).map((job, index) => (
            <motion.div 
              key={job._id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: index * 0.1 }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default LatestJobs;

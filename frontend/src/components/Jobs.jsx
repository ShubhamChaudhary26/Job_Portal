import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
// import Job from './Job'
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9,10];
const Jobs = () => {
  const { allJobs, searchQuerytext } = useSelector((store) => store.job);
  const [filterJobs, SetFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchQuerytext) {
      const Filteredjobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuerytext.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(searchQuerytext.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuerytext.toLowerCase())
        );
      });
      SetFilterJobs(Filteredjobs);
    } else {
      SetFilterJobs(allJobs);
    }
  }, [searchQuerytext, allJobs]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span> Job Not Found </span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 1 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

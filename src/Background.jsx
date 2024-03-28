import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <>
      <div className='w-full h-screen absolute z-[2] bg-zinc-300'>
        <h1 className='flex justify-center py-20 text-xl absolute top-[5%] w-full'> </h1>

        {/* Apply Framer Motion to make the h1 element float */}
        <motion.h1
          className='font-semibold text-[13vw] absolute top-[40vh] left-[60vh] -translate-x-[10%] -translate-y-[10%] text-black-400'
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Todo list
        </motion.h1>
      </div>
    </>
  );
};

export default Background;

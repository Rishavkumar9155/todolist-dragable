import React, { useState, useRef } from 'react';
import { MdAttachFile } from 'react-icons/md';
import { FaStopCircle, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaPlusCircle } from "react-icons/fa";

function Cards({ data, containerRef, onDelete }) {
  const [listTodo, setListTodo] = useState([]);
  const [footerClicked, setFooterClicked] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);

  const addTask = (inputText) => {
    setListTodo([...listTodo, inputText]);
  };

  const deleteTask = (index) => {
    const updatedList = [...listTodo];
    updatedList.splice(index, 1);
    setListTodo(updatedList);
  };

  const handleFooterClick = () => {
    setFooterClicked(!footerClicked);
    // Save completion time if task is marked as completed
    if (!footerClicked) {
      setCompletionTime(new Date().toLocaleString());
    } else {
      setCompletionTime(null);
    }
  };

  return (
    <motion.div
      drag
      whileTap={{ scale: 1.10 }}
      dragElastic={0.3}
      dragConstraints={containerRef}
      className={`relative w-[40vh] h-[40vh] rounded-[20px] bg-zinc-900 text-white p-5 overflow-hidden text-[20px]`}
    >
      <MdAttachFile />
      <p className='text-xs mt-5 font-semibold text-[22px] leading-tight'>{data.desc}</p>
      <div className={`footer absolute bottom-0 left-0 h-16 w-full rounded-[8px] flex items-center justify-between mb-4 ${footerClicked ? 'bg-green-500' : 'bg-orange-500'}`} onClick={handleFooterClick}>
        <div className='ml-5'>{footerClicked ? 'Task completed' : 'Task to do'}</div>
        <div className='mr-5 w-7'>
          <FaStopCircle />
        </div>
      </div>
      <div>
        {listTodo.map((task, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>{task}</div>
            <div onClick={() => deleteTask(index)}>
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 right-0 m-3 cursor-pointer" onClick={onDelete}>
        <FaTrash />
      </div>
      {completionTime && (
        <div className="absolute bottom-2 right-0 mb-3 mr-3 text-xs">Completed: {completionTime}</div>
      )}
    </motion.div>
  );
}

function CardSection() {
  const [inputText, setInputText] = useState("");
  const [cardsData, setCardsData] = useState([]);
  const containerRef = useRef(null);

  const handleAddTask = () => {
    if (inputText.trim() !== "") {
      setCardsData([...cardsData, { desc: inputText }]);
      setInputText("");
    }
  };

  const handleDeleteCard = (index) => {
    const updatedCardsData = [...cardsData];
    updatedCardsData.splice(index, 1);
    setCardsData(updatedCardsData);
  };

  return (
    <div className='fixed top-0 left-0 z-[99] w-full h-full flex gap-10 flex-wrap-wrap p-10' ref={containerRef}>
      <div className="w-full flex items-center  top-40 left-[70vh] gap-x-4  absolute">
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Add Your Task'
          className='w-[70vh] h-[10vh] text-[50px] rounded-[20px] p-8 border-slate-800 text-white bg-slate-500 z-99 '
        />
        <button onClick={handleAddTask} className='size-1'>
          <FaPlusCircle className='size-10 my-[-20px]' />
        </button>
      </div>
      {cardsData.map((cardData, index) => (
        <Cards key={index} data={cardData} containerRef={containerRef} onDelete={() => handleDeleteCard(index)} />
      ))}
    </div>
  )
}

export default CardSection;

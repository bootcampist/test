import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';


function ProjectCard(props) {
  const {id} = useParams(); //get task id
  const {user} = useAuthContext();



  // Set the headers configuration for the request
 const userData = {
  headers: {
  Authorization: `Bearer ${user?.token}`,

  }
};
// Delete project
const handleDelete = async (project) => {
  try {
    // Send a DELETE request to the backend API endpoint
    console.log(props._id)
    await axios.delete(`https://server-n.vercel.app/projects/${props._id}`);
    console.log('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};


	return (
    <div id="card-container">
      <div className="task project-card w-[20%] border-2 rounded-xl p-5 hover:scale-125 duration-500 ease-in-out">
        <div className="flex justify-between items-center mb-5 gap-x-6">
        <Link to={`/newTask/${props._id}`} className="update">
          <h1 className="text-xl lg:text-2xl font-bold">{props.title}</h1>
        </Link>
          <span className="text-xl select-none text-[#627bb4] dark:text-[#528bac]" onClick={(e) => handleDelete(props._id)}>X</span>
        </div>
        <div className="flex justify-between items-center mb-5 gap-x-6">
          <div className="flex flex-col">
            <span className="text-xs select-none text-[#627bb4] dark:text-[#528bac]">Created:</span> 
            <span className="text-xs select-all">{props.tDate}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm select-none text-[#627bb4] dark:text-[#528bac]">Deadline:</span>
            <span className="text-sm select-all">{props.targetDate}</span>
          </div>
        </div>
        <p className="text-sm select-none mb-2 text-[#627bb4] dark:text-[#528bac]">Description:</p>
        <p className="text-lg mb-2">{props.tDesc}</p>
        <ul className="my-4">
          <li className="text-sm select-none mb-2 text-[#627bb4] dark:text-[#528bac]">To-Do List:</li>
          {props.toDoList.map(item => (
            <li className="text-lg select-all">{item}</li>
          ))}
        </ul>
        <h2 className="border-2 border-opacity-50 border-[#e6c5ac] bg-[#f6d5bd] bg-opacity-20 px-2 py-2 rounded-lg text-center text-sm">{props.status}</h2>
      </div>
    </div>
	);
}

export default ProjectCard;

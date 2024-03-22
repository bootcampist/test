import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import useGetProjects from '../hooks/useGetProjects';
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';



function Projects() {
  const {id} = useParams(); //get task id
  const {user} = useAuthContext();
  const {projects, loading, error} = useGetProjects();
  let dbTask = projects;

  useEffect(() => {

  }, [dbTask]);

  // Delete a project
  const handleProjectDelete = () => {
    // Update the state to re-render Projects
  };

  return (
    <div className="h-dvh flex flex-col lg:flex-row flex-wrap gap-3 items-center justify-evenly"> 
     {dbTask.map((dbTask) =>(
            
      <ProjectCard 
        key={dbTask._id}
        _id={dbTask._id}
        title={dbTask.title}
        tDate ={dbTask.tDate}
        targetDate={dbTask.targetDate}
        tDesc={dbTask.tDesc}
        toDoList={dbTask.toDoList.map(toDoList =>
          <li key="toDoList">{toDoList}</li>)}       

       status={dbTask.status}
       
      />
    ))}
    </div>
  )
}

export default Projects;
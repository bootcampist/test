import React from "react";
import Projects from "../components/Projects";
import { useParams } from 'react-router-dom';
import { NavLink, Link } from "react-router-dom";



function ProjectPage() {
    const {id} = useParams(); //get task id

  	return (
		<>
            <div className="button-container">
            <Link to="/newTask"><button className="project-button">+</button></Link>
            </div>
            
            <Projects />
		</>
  	)
};

export default ProjectPage;
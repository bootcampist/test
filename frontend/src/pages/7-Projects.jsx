import React from "react";
import Projects from "../components/Projects";
import { useParams } from 'react-router-dom';


function ProjectPage() {
    const {id} = useParams(); //get task id

  	return (
		<>
        <Projects />
		</>
  	)
};

export default ProjectPage;
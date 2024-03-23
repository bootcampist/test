import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import useGetProjects from '../hooks/useGetProjects';


const CreateProjectForm = () => {
  const {id} = useParams(); //get task id
  const {user} = useAuthContext();
  const navigate = useNavigate()
  const {projects, loading, setLoading, error} = useGetProjects();
  

  const [formData, setFormData] = useState({
    title: '',
    targetDate: '',
    tDesc: '',
    toDoList: '',
    status: 'Not started'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Set the headers configuration for the request
  const userData = {
    headers: {
    Authorization: `Bearer ${user?.token}`,

    }
  };

  const postData = async () => {
    try {


        // Make POST request to add new project to database
        // const response = await axios.post('https://server-n.vercel.app/projects', formData, userData);
        const response = await axios.post('http://localhost:3002/projects', formData, userData);


        console.log('Project created successfully:', response.data);
      } catch (error) {
        // Handle errors if request fails
        console.error('Error creating project:', error);
      }
  }

  useEffect(()=> {
    const getData = async (id) => {
      try {
        //   const response = await axios.get(`https://server-n.vercel.app/projects/${id}`, userData);
        const response = await axios.get(`http://localhost:3002/projects/${id}`, userData);

          setFormData({
            title: response.data.title || '',
            targetDate: response.data.targetDate || '',
            tDesc: response.data.tDesc || '',
            toDoList: response.data.toDoList || '',
            status: response.data.status || 'Not Started'
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching project:', error);
          throw error; 
      }
  };
  id ? getData(id) : formData;
}, [])

const updateData = async (id) => {
  try {
    //   const response = await axios.put(`https://server-n.vercel.app/projects/${id}`, formData, userData);
    const response = await axios.put(`http://localhost:3002/projects/${id}`, formData, userData);

      console.log('update', response.data); return response.data;
  } catch (error) {
      console.error('Error updating project:', error);
      throw error; 
  }
};
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(id){
      updateData(id);
    } else { 
    // Split the toDoList input value into an array of items
    const todoItems = formData.toDoList.split(',').map(item => item.trim());
    setFormData({ ...formData, toDoList: todoItems });
    postData();
   }
    // Reset the form
    setFormData({
      title: '',
      targetDate: '',
      tDesc: '',
      toDoList: '',
      status: 'Not Started'
    });
    setLoading(true);
    navigate('/projects');

  };

  return (
    <div className="form-div">
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Title" className="project-form" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="project-form-label">
        <label>Deadline:</label>
        <input type="date" placeholder="Deadline" className="project-form" name="targetDate" value={formData.targetDate} onChange={handleChange} />
      </div>
      <div>
        <textarea name="tDesc" placeholder="Description" className="project-form" value={formData.tDesc} onChange={handleChange}></textarea>
      </div>
      <div>
        <textarea name="toDoList" placeholder="To-Do List" className="project-form" value={formData.toDoList} onChange={handleChange}></textarea>   
      </div>
      <div className="project-form-label">
        <label>Status:</label>
        <select id="status" name="status" className="project-form" value={formData.status} onChange={handleChange}>
            <option value="Not started">Not Started</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
        </select>
      </div>
      <button type="submit" id="project-button">Submit</button>
    </form>
    </div>
  );
};

export default CreateProjectForm;
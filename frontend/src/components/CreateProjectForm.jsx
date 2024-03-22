import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';

const CreateProjectForm = () => {
  const {id} = useParams(); //get task id
  const {user} = useAuthContext();
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

//   const format = () => {
//     setFormData({ ...formData, [name]: name.includes('Date') ? value.split('-').join('/') : value });
//   }
  // Set the headers configuration for the request
  const userData = {
    headers: {
    Authorization: `Bearer ${user?.token}`,

    }
  };

  const postData = async () => {
    try {
        // Make POST request to add new project to database
        const response = await axios.post('https://server-n.vercel.app//projects', formData, userData);

        console.log('Project created successfully:', response.data);
      } catch (error) {
        // Handle errors if request fails
        console.error('Error creating project:', error);
      }
  }

  useEffect(()=> {
    const getData = async (id) => {
      try {
          const response = await axios.get(`https://server-n.vercel.app/projects/${id}`, userData);
          console.log(response.data); 
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
      const response = await axios.put(`https://server-n.vercel.app/projects/${id}`, formData, userData);
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
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" className="project-form" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Deadline:</label>
        <input type="date" className="project-form" name="targetDate" value={formData.targetDate} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="tDesc" className="project-form" value={formData.tDesc} onChange={handleChange}></textarea>
      </div>
      <div>
      <label>To-Do List:</label>
        <textarea name="toDoList" className="project-form" value={formData.toDoList} onChange={handleChange}></textarea>   
      </div>
      <div>
        <label>Status:</label>
        {/* <input type="text" name="status" value={formData.status} onChange={handleChange} /> */}
        <select id="status" name="status" className="project-form" value={formData.status} onChange={handleChange}>
            <option value="Not started">Not Started</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProjectForm;

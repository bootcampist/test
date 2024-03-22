import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";


const useGetProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuthContext();

  // Set the headers configuration for the request
  const userData = {
    headers: {
    Authorization: `Bearer ${user?.token}`,

    }
  };

  
  useEffect(() => {
    axios.get('http://localhost:3002/projects', userData)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
        console.log(projects)
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { projects, loading, error };
};

export default useGetProjects;
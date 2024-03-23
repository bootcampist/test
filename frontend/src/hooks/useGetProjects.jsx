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

//   Get the projects from the database each time the loading value changes
  useEffect(() => {
    axios.get('http://localhost:3002/projects', userData)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [loading]);

  return { projects, loading, setLoading, error };
};

export default useGetProjects;
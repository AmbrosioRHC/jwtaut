import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5173/api/private', {
          headers: { Authorization: token },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Protected;

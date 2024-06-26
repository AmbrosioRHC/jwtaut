import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para almacenar mensajes de éxito o error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reinicia el mensaje cada vez que se envía el formulario
    try {
        const response = await axios.post('http://127.0.0.1:5173/api/login', { email, password });
        sessionStorage.setItem('token', response.data.token);
        console.log('Login successful'); // Mensaje en consola para el éxito
        setMessage('Login successful. Redirecting...'); // Mensaje de éxito para el usuario
        setTimeout(() => {
          navigate('/private'); // Redirecciona después de mostrar el mensaje
        }, 2000); // Retraso para permitir que el usuario lea el mensaje
    } catch (error) {
      console.error('Login failed: Invalid credentials', error);
      setMessage('Invalid credentials. Please try again.'); // Mensaje de error para el usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {message && <p>{message}</p>} 
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const [success, setSuccess] = useState(''); // Estado para almacenar mensajes de éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reiniciar el mensaje de error antes de una nueva solicitud
    setSuccess(''); // Reiniciar el mensaje de éxito antes de una nueva solicitud
    try {
      const response = await axios.post('http://127.0.0.1:5173/api/signup', { email, password });
      if (response.status === 201) {
        setSuccess('Registro exitoso. Redirigiendo...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);  // Redirigir después de mostrar el mensaje de éxito por 3 segundos
      }
    } catch (error) {
      console.error('There was an error creating your account!', error);
      if (error.response && error.response.data.message === 'Email already registered') {
        setError('El correo electrónico ya está registrado.');
      } else {
        setError('Ocurrió un error al crear tu cuenta. Por favor intenta de nuevo.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        autoComplete="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="new-password"
      />
      <button type="submit">Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default Signup;

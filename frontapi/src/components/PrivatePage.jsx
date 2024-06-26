import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivatePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige a login si no hay token
    }
    // Además, puedes hacer una validación del token con la API para verificar su validez
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido a la página privada</h1>
      {/* Contenido protegido */}
    </div>
  );
};

export default PrivatePage;


import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/tasks');
    } catch (err) {
      setError('No se pudo iniciar sesión. Revisa tus credenciales.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');

    try {
      await loginWithGoogle();
      navigate('/tasks');
    } catch (err) {
      setError('Error al iniciar sesión con Google.');
    }
  };

  return (
    <section className="app-shell">
      <div className="app-header glass-header">
        <h1 className="gradient-text">TaskFlow</h1>
        <p>Tu flujo de trabajo, simplificado.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
        <button type="button" onClick={handleGoogleLogin} className="secondary-button" style={{width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
          Continuar con Google
        </button>
        <p style={{marginTop: '2rem'}}>
          ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;

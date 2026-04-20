import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/'); // Redirigir al dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Email o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-card card-glass">
                <div className="auth-header">
                    <h2>Bienvenido</h2>
                    <p>Inicia sesión para gestionar tus proyectos</p>
                </div>

                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="auth-footer">
                    ¿No tienes cuenta? <Link to="/register">Regístrate ahora</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

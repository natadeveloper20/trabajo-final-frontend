import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);
        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-container animate-fade-in">
                <div className="auth-card card-glass text-center">
                    <div className="icon-success">📧</div>
                    <h2>¡Registro casi completo!</h2>
                    <p>Hemos enviado un correo de verificación a <strong>{formData.email}</strong>.</p>
                    <p>Por favor, revisa tu bandeja de entrada para activar tu cuenta.</p>
                    <button className="btn-primary mt-4" onClick={() => navigate('/login')}>Ir al Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-card card-glass">
                <div className="auth-header">
                    <h2>Crear Cuenta</h2>
                    <p>Únete a ProjectHub y gestiona tus tareas con estilo</p>
                </div>

                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="Ej: Noe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Ej: Mendieta"
                            />
                        </div>
                    </div>

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

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <div className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

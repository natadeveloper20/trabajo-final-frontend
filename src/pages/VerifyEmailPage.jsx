import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './AuthPages.css';

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                await authService.verifyEmail(token);
                setStatus('success');
                setMessage('Tu email ha sido verificado con éxito. Ya puedes iniciar sesión.');
            } catch (err) {
                setStatus('error');
                setMessage(err.response?.data?.message || 'Error al verificar el email. El token puede haber expirado.');
            }
        };
        verify();
    }, [token]);

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-card card-glass text-center">
                {status === 'verifying' && (
                    <div className="loader-container" style={{ height: 'auto', padding: '20px' }}>
                        <span className="custom-loader"></span>
                        <h2>Verificando tu email...</h2>
                        <p>Espera un momento mientras validamos tu cuenta.</p>
                    </div>
                )}

                {status === 'success' && (
                    <>
                        <div className="icon-success" style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
                        <h2>¡Cuenta Activada!</h2>
                        <p style={{ marginBottom: '30px' }}>{message}</p>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/login')}>Ir al Login</button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="icon-error" style={{ fontSize: '4rem', marginBottom: '20px' }}>❌</div>
                        <h2>Error de Verificación</h2>
                        <p style={{ color: 'var(--error-color)', marginBottom: '30px' }}>{message}</p>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/register')}>Volver a Registrarse</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;

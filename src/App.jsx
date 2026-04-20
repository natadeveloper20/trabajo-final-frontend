import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

// Placeholder para el Dashboard
const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Bienvenido, {user?.firstName}!</h1>
            <p>Has iniciado sesión correctamente. Aquí gestionaremos tus proyectos muy pronto.</p>
            <button 
                onClick={logout} 
                className="btn-primary" 
                style={{ width: 'auto', marginTop: '20px', padding: '10px 30px' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
                    
                    {/* Ruta Protegida */}
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    
                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

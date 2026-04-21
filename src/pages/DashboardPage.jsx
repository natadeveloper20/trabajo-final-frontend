import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import './DashboardPage.css';

const DashboardPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Estados para el Modal de creación
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectService.getProjects();
            setProjects(response.data);
        } catch (err) {
            setError('Error al cargar los proyectos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await projectService.createProject(formData);
            setIsModalOpen(false);
            setFormData({ name: '', description: '' });
            fetchProjects();
        } catch (err) {
            alert('Error al crear el proyecto');
        } finally {
            setCreateLoading(false);
        }
    };

    if (loading) return <div className="loader">Cargando proyectos...</div>;

    return (
        <div className="dashboard-container animate-fade-in">
            <Navbar />
            
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h2>Tus Proyectos</h2>
                    <button 
                        className="btn-primary" 
                        style={{ width: 'auto' }}
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Nuevo Proyecto
                    </button>
                </header>

                {error && <div className="alert-error">{error}</div>}

                <div className="projects-grid">
                    {projects.length > 0 ? (
                        projects.map(project => (
                            <Link to={`/project/${project._id}`} key={project._id} className="project-card card-glass">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <div className="project-meta">
                                    <span>{project.tasks?.length || 0} tareas</span>
                                    <span>Ver detalles →</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="empty-state card-glass">
                            <p>No tienes proyectos aún. ¡Crea el primero!</p>
                        </div>
                    )}
                </div>
            </main>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Crear Nuevo Proyecto"
            >
                <form onSubmit={handleCreateProject} className="auth-form">
                    <div className="form-group">
                        <label>Nombre del Proyecto</label>
                        <input 
                            type="text" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej: Mi Gran Idea"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea 
                            required 
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe brevemente de qué trata este proyecto..."
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontFamily: 'inherit',
                                minHeight: '100px'
                            }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={createLoading}>
                        {createLoading ? 'Creando...' : 'Crear Proyecto'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default DashboardPage;

import React, { useState, useEffect, useCallback } from 'react';
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

    const fetchProjects = useCallback(async () => {
        try {
            const response = await projectService.getProjects();
            setProjects(response.data);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los proyectos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects().catch(err => console.error(err));
    }, [fetchProjects]);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await projectService.createProject(formData);
            setIsModalOpen(false);
            setFormData({ name: '', description: '' });
            fetchProjects().catch(err => console.error(err));
        } catch (err) {
            console.error(err);
            alert('Error al crear el proyecto');
        } finally {
            setCreateLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span className="premium-loader"></span>
                <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Cargando tus proyectos...</p>
            </div>
        );
    }

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
                        projects.map(project => {
                            const totalTasks = project.tasks?.length || 0;
                            const completedTasks = project.tasks?.filter(t => t.status === 'completada').length || 0;
                            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                            return (
                                <Link to={`/project/${project._id}`} key={project._id} className="project-card card-glass">
                                    <div className="project-card-header">
                                        <h3>{project.name}</h3>
                                        <div className="project-progress-circle">
                                            {progress}%
                                        </div>
                                    </div>
                                    <p>{project.description}</p>
                                    
                                    <div className="project-progress-container">
                                        <div className="progress-bar-bg">
                                            <div 
                                                className="progress-bar-fill" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="project-meta">
                                        <span>{totalTasks} tareas</span>
                                        <span>{completedTasks} completadas</span>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="empty-state card-glass animate-fade-in">
                            <div className="empty-icon">📂</div>
                            <h3>No hay proyectos activos</h3>
                            <p>Organiza tus ideas y empieza a gestionar tus tareas hoy mismo.</p>
                            <button 
                                className="btn-primary" 
                                style={{ marginTop: '20px' }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Crear mi primer proyecto
                            </button>
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
                            className="form-textarea"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe brevemente de qué trata este proyecto..."
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

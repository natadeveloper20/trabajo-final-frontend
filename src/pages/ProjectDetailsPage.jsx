import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import './ProjectDetailsPage.css';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estados para los Modales
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        description: '',
        priority: 'media',
        dueDate: ''
    });
    
    const [projectFormData, setProjectFormData] = useState({
        name: '',
        description: ''
    });

    const [filter, setFilter] = useState('todas'); // todas, pendiente, completada
    const [createLoading, setCreateLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const fetchProjectDetails = useCallback(async () => {
        try {
            const projectData = await projectService.getProject(id);
            setProject(projectData.data);
            setProjectFormData({
                name: projectData.data.name,
                description: projectData.data.description
            });
            const tasksData = await taskService.getTasksByProject(id);
            setTasks(tasksData.data);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los detalles del proyecto');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProjectDetails().catch(err => console.error(err));
    }, [fetchProjectDetails]);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'todas') return true;
        return task.status === filter;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completada').length,
        pending: tasks.filter(t => t.status === 'pendiente').length,
        progress: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completada').length / tasks.length) * 100) : 0
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await taskService.createTask({
                ...taskFormData,
                project: id
            });
            setIsTaskModalOpen(false);
            setTaskFormData({ title: '', description: '', priority: 'media', dueDate: '' });
            fetchProjectDetails().catch(err => console.error(err));
        } catch (err) {
            console.error(err);
            alert('Error al crear la tarea');
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDeleteProject = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto y todas sus tareas?')) {
            try {
                await projectService.deleteProject(id);
                navigate('/');
            } catch (err) {
                console.error(err);
                alert('Error al eliminar el proyecto');
            }
        }
    };

    const handleEditProject = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            await projectService.updateProject(id, projectFormData);
            setIsEditModalOpen(false);
            fetchProjectDetails().catch(err => console.error(err));
        } catch (err) {
            console.error(err);
            alert('Error al actualizar el proyecto');
        } finally {
            setEditLoading(false);
        }
    };

    const handleToggleTaskStatus = async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'completada' ? 'pendiente' : 'completada';
        try {
            await taskService.updateTask(taskId, { status: newStatus });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
        } catch (err) {
            console.error(err);
            alert('Error al actualizar la tarea');
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span className="custom-loader"></span>
                <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Cargando detalles...</p>
            </div>
        );
    }
    if (!project) return (
        <div className="error-page card-glass">
            <Navbar />
            <div className="text-center p-10">
                <h2>Proyecto no encontrado</h2>
                <Link to="/" className="btn-primary mt-4">Volver al Dashboard</Link>
            </div>
        </div>
    );

    return (
        <div className="project-details-container animate-fade-in">
            <Navbar />

            <main className="project-details-content">
                {error && <div className="alert-error mb-4">{error}</div>}
                <div className="project-actions-bar">
                    <Link to="/" className="btn-back">← Volver al Dashboard</Link>
                    <div className="project-management-btns">
                        <button onClick={() => setIsEditModalOpen(true)} className="btn-edit-project">Editar Proyecto</button>
                        <button onClick={handleDeleteProject} className="btn-delete-project">Eliminar Proyecto</button>
                    </div>
                </div>

                <div className="project-summary-grid">
                    <div className="project-info card-glass">
                        <h1>{project.name}</h1>
                        <p>{project.description}</p>
                    </div>

                    <div className="project-stats card-glass">
                        <div className="stats-header">
                            <h3>Resumen de Progreso</h3>
                            <span className="progress-badge">{stats.progress}%</span>
                        </div>
                        <div className="stats-body">
                            <div className="stat-item">
                                <span className="stat-value">{stats.total}</span>
                                <span className="stat-label">Tareas Totales</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{stats.completed}</span>
                                <span className="stat-label">Completadas</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{stats.pending}</span>
                                <span className="stat-label">Pendientes</span>
                            </div>
                        </div>
                        <div className="progress-bar-bg" style={{ marginTop: '20px', height: '12px' }}>
                            <div className="progress-bar-fill" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <section className="tasks-section">
                    <header className="tasks-header">
                        <div className="tasks-header-left">
                            <h2>Tareas</h2>
                            <div className="task-filters">
                                <button 
                                    className={`filter-btn ${filter === 'todas' ? 'active' : ''}`}
                                    onClick={() => setFilter('todas')}
                                >
                                    Todas
                                </button>
                                <button 
                                    className={`filter-btn ${filter === 'pendiente' ? 'active' : ''}`}
                                    onClick={() => setFilter('pendiente')}
                                >
                                    Pendientes
                                </button>
                                <button 
                                    className={`filter-btn ${filter === 'completada' ? 'active' : ''}`}
                                    onClick={() => setFilter('completada')}
                                >
                                    Completadas
                                </button>
                            </div>
                        </div>
                        <button 
                            className="btn-primary" 
                            style={{ width: 'auto' }}
                            onClick={() => setIsTaskModalOpen(true)}
                        >
                            + Nueva Tarea
                        </button>
                    </header>

                    <div className="tasks-list">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <div key={task._id} className={`task-item card-glass ${task.status}`}>
                                    <div className="task-status-indicator" onClick={() => handleToggleTaskStatus(task._id, task.status)}>
                                        <div className={`status-dot ${task.status}`}></div>
                                    </div>
                                    <div className="task-body">
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                        <div className="task-badges">
                                            <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                                            {task.dueDate && <span className="badge-date">Fecha: {new Date(task.dueDate).toLocaleDateString()}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-tasks card-glass">
                                <p>No hay tareas en este proyecto. ¡Empieza creando una!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Modal 
                isOpen={isTaskModalOpen} 
                onClose={() => setIsTaskModalOpen(false)}
                title="Añadir Nueva Tarea"
            >
                <form onSubmit={handleCreateTask} className="auth-form">
                    <div className="form-group">
                        <label>Título de la Tarea</label>
                        <input 
                            type="text" 
                            required 
                            value={taskFormData.title}
                            onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                            placeholder="Ej: Terminar informe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea 
                            required 
                            className="form-textarea"
                            value={taskFormData.description}
                            onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                            placeholder="Detalles sobre qué hay que hacer..."
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Prioridad</label>
                            <select 
                                value={taskFormData.priority}
                                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                            >
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Fecha Límite (opcional)</label>
                            <input 
                                type="date" 
                                value={taskFormData.dueDate}
                                onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" disabled={createLoading}>
                        {createLoading ? 'Creando...' : 'Crear Tarea'}
                    </button>
                </form>
            </Modal>

            <Modal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Proyecto"
            >
                <form onSubmit={handleEditProject} className="auth-form">
                    <div className="form-group">
                        <label>Nombre del Proyecto</label>
                        <input 
                            type="text" 
                            required 
                            value={projectFormData.name}
                            onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
                            placeholder="Nombre del proyecto"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea 
                            required 
                            className="form-textarea"
                            value={projectFormData.description}
                            onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                            placeholder="Descripción del proyecto"
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={editLoading}>
                        {editLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </form>
            </Modal>

        </div>
    );
};

export default ProjectDetailsPage;

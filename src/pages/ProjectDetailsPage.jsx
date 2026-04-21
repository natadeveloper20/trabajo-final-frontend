import { useState, useEffect, useCallback } from 'react';
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

    // Estados para el Modal de creación de tareas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        description: '',
        priority: 'media',
        dueDate: ''
    });
    const [createLoading, setCreateLoading] = useState(false);

    const fetchProjectDetails = useCallback(async () => {
        try {
            const projectData = await projectService.getProject(id);
            setProject(projectData.data);
            const tasksData = await taskService.getTasksByProject(id);
            setTasks(tasksData.data);
        } catch (err) {
            setError('Error al cargar los detalles del proyecto');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProjectDetails();
    }, [fetchProjectDetails]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await taskService.createTask({
                ...taskFormData,
                project: id
            });
            setIsModalOpen(false);
            setTaskFormData({ title: '', description: '', priority: 'media', dueDate: '' });
            fetchProjectDetails();
        } catch (err) {
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
                alert('Error al eliminar el proyecto');
            }
        }
    };

    const handleToggleTaskStatus = async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'completada' ? 'pendiente' : 'completada';
        try {
            await taskService.updateTask(taskId, { status: newStatus });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
        } catch (err) {
            alert('Error al actualizar la tarea');
        }
    };

    if (loading) return <div className="loader">Cargando detalles...</div>;
    if (!project) return <div className="error-page">Proyecto no encontrado</div>;

    return (
        <div className="project-details-container animate-fade-in">
            <Navbar />

            <main className="project-details-content">
                <div className="project-actions-bar">
                    <Link to="/" className="btn-back">← Volver al Dashboard</Link>
                    <button onClick={handleDeleteProject} className="btn-delete-project">Eliminar Proyecto</button>
                </div>

                <div className="project-info card-glass">
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                </div>

                <section className="tasks-section">
                    <header className="tasks-header">
                        <h2>Tareas ({tasks.length})</h2>
                        <button 
                            className="btn-primary" 
                            style={{ width: 'auto' }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Nueva Tarea
                        </button>
                    </header>

                    <div className="tasks-list">
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <div key={task._id} className={`task-item card-glass ${task.status}`}>
                                    <div className="task-status-checkbox" onClick={() => handleToggleTaskStatus(task._id, task.status)}>
                                        {task.status === 'completada' ? '✅' : '⭕'}
                                    </div>
                                    <div className="task-body">
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                        <div className="task-badges">
                                            <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                                            {task.dueDate && <span className="badge-date">📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
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
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
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
                            value={taskFormData.description}
                            onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                            placeholder="Detalles sobre qué hay que hacer..."
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                minHeight: '80px'
                            }}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Prioridad</label>
                            <select 
                                value={taskFormData.priority}
                                onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                                className="input"
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
        </div>
    );
};

export default ProjectDetailsPage;

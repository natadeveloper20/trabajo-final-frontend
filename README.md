# ProjectHub - Frontend 

Interfaz de usuario moderna, intuitiva y responsiva para la gestión de proyectos y tareas. Desarrollada con React 19 y Vite para una experiencia de desarrollo y usuario ultrarrápida.

## Características Principales
- **Diseño Glassmorphism**: Estética premium con efectos de cristal, desenfoque y modo oscuro elegante.
- **Totalmente Responsiva**: Adaptabilidad fluida desde móviles (320px) hasta monitores UltraWide (2000px).
- **Gestión de Estado Global**: Uso eficiente de `React Context API` para el manejo de la sesión del usuario.
- **Seguridad**: Rutas protegidas que redirigen dinámicamente si el usuario no ha iniciado sesión.
- **Interacción Dinámica**: Modales animados, micro-interacciones y feedback en tiempo real mediante Axios.

## Tecnologías
- **Core**: React 19 + Vite
- **Navegación**: React Router Dom 7
- **Comunicación**: Axios con interceptores para manejo de tokens.
- **Estilos**: Vanilla CSS con variables personalizadas (sin librerías pesadas para máximo rendimiento).
- **Iconos**: Emojis integrados para un look moderno y liviano.

## Instalación y Uso

1. **Clonar y Entrar**:
   ```bash
   cd frontend
   ```
2. **Instalar Dependencias**:
   ```bash
   npm install
   ```
3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. **Iniciar Servidor de Desarrollo**:
   ```bash
   npm run dev
   ```

## Estructura de Pantallas
- **Login / Registro**: Flujos validados con estados de carga y manejo de errores del servidor.
- **Verificación de Cuenta**: Landing page que procesa el token de activación enviado por email.
- **Dashboard**: Panel principal con la vista de todos los proyectos en formato de tarjetas interactivas.
- **Detalle de Proyecto**: Vista granular para gestionar tareas, cambiar su estado (drag & drop conceptual) y ver progresos.

---
*Este proyecto forma parte del Trabajo Integrador Final de la UTN.*

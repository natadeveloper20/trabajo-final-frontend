# ProjectHub - Frontend 💻

Interfaz de usuario moderna y responsiva para la gestión de proyectos y tareas. Desarrollada con React y Vite.

## 📋 Características
- **UI Responsiva**: Optimizada para dispositivos móviles y escritorio (320px a 2000px).
- **Diseño Premium**: Estética de modo oscuro con efectos de Glassmorphism (cristal).
- **Gestión de Estado**: Uso de `React Context API` para el manejo global de autenticación.
- **Navegación**: Enrutamiento dinámico y protegido con `React Router`.
- **Integración API**: Comunicación fluida con el backend mediante `Axios`.

## 🛠️ Tecnologías
- React 19
- Vite
- Axios
- React Router Dom
- Vanilla CSS (Glassmorphism design)

## ⚙️ Instalación y Uso

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar el archivo `.env` (o usar el valor por defecto configurado en `api.js`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Ejecutar `npm run dev` para iniciar el servidor de desarrollo.

## 📱 Pantallas Principales
- **Login / Registro**: Flujo de autenticación con feedback visual.
- **Verificación de Email**: Página de destino para la activación de cuenta.
- **Dashboard**: Vista principal con la cuadrícula de proyectos del usuario.
- **Detalle de Proyecto**: Vista específica para gestionar tareas, cambiar su estado y prioridades.

## 📄 Licencia
Este proyecto es para fines académicos (UTN - PWA).

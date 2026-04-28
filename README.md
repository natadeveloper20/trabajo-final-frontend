# ✨ ProjectHub - Frontend

Interfaz de usuario premium y moderna desarrollada con **React 19** y **Vite**. Este sistema permite gestionar proyectos y tareas de forma intuitiva, con un enfoque fuerte en la experiencia de usuario (UX/UI).

## 💎 Características Visuales (Premium UI)
- **Glassmorphism Design**: Interfaz translúcida con efectos de desenfoque y profundidad.
- **Micro-interacciones**: Animaciones suaves al pasar el mouse por tarjetas y botones.
- **Dark Mode Moderno**: Paleta de colores curada para reducir la fatiga visual.
- **Feedback en Tiempo Real**: Loaders personalizados y manejo visual de estados de carga.

## 📱 Responsividad (Requisito 320px - 2000px)
La aplicación ha sido testeada rigurosamente para garantizar una visualización perfecta en:
- **Mobile (iPhone SE/Android)**: Menús colapsables y tarjetas adaptadas.
- **Tablets**: Grillas dinámicas que ajustan el contenido.
- **Desktop & UltraWide**: Aprovechamiento del espacio manteniendo la legibilidad.

## 🚀 Tecnologías
- **Framework**: React 19 + Vite
- **Routing**: React Router Dom 7
- **HTTP Client**: Axios (con interceptores para JWT)
- **Estilos**: Vanilla CSS con Sistema de Variables CSS (Design Tokens).
- **Context API**: Gestión global del estado de autenticación.

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone [URL-DEL-REPO]
   cd ProjectHub/frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Crea un archivo `.env` basado en `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Ejecutar**:
   ```bash
   npm run dev
   ```

## 🖼️ Estructura de la App
- **Login/Registro**: Formularios validados con feedback visual.
- **Dashboard**: Vista general con barras de progreso dinámicas por proyecto.
- **Detalle de Proyecto**: Gestión granular de tareas con filtros (Pendientes/Completadas).
- **Verificación**: Pantalla de éxito/error tras la activación por email.

---
**Desarrollado para:** UTN - Programación Web Avanzada.
**URL Deploy Web:** [Placeholder: Tu_URL_de_Vercel_o_Netlify]

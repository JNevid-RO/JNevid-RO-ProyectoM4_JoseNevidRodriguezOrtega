# TaskFlow 🚀 (Anteriormente MateCode Task Manager)

**🌐 Demo en vivo:** [https://j-nevid-ro-proyecto-m4-jose-nevid-r.vercel.app/](https://j-nevid-ro-proyecto-m4-jose-nevid-r.vercel.app/)

Una aplicación Single Page Application (SPA) premium para la gestión avanzada de tareas, desarrollada con **React, TypeScript y Firebase**, y diseñada con una interfaz moderna basada en **Glassmorphism**.

Ideal para demostrar habilidades *Full-Stack*, manejo de estado complejo, enrutamiento, y despliegues *Serverless*.

## ✨ Características Principales

- **Diseño Premium (Glassmorphism):** Interfaz altamente interactiva, responsiva y visualmente atractiva con transiciones suaves, variables CSS y tipografía moderna (Outfit).
- **Autenticación Segura:** Inicio de sesión y registro utilizando **Firebase Authentication** (Google OAuth y Correo/Contraseña).
- **Gestión Avanzada de Tareas (CRUD):** 
  - Creación, lectura, actualización y eliminación de tareas.
  - Asignación de **Prioridad** (Alta, Media, Baja) con indicadores visuales (Badges).
  - Asignación de **Fechas de Vencimiento** y registro automático de Fecha de Creación.
- **Panel de Control Dinámico:** Menú de pestañas para alternar entre tareas pendientes y completadas, además de filtros para ordenar instantáneamente por creación, vencimiento o prioridad.
- **Persistencia en la Nube:** Base de datos en tiempo real impulsada por **Firestore**, manteniendo los datos sincronizados.
- **Notificaciones por Email:** Integración Backend con **Amazon Web Services (AWS SES)** mediante funciones Serverless de Vercel para enviar resúmenes de tareas directamente a tu bandeja de entrada.

## 📁 Estructura del Proyecto

- `src/pages/` - Vistas principales (HomePage, LoginPage, RegisterPage, DashboardPage).
- `src/components/` - Componentes UI reutilizables (TaskForm, TaskList, etc).
- `src/services/` - Conexiones externas (Firestore, Firebase Auth, API local).
- `src/hooks/` - Lógica de estado custom (`useAuth`, `useTasks`).
- `src/types/` - Definiciones de interfaces estáticas de TypeScript (`Task`).
- `api/` - **Vercel Serverless Functions** configuradas para el envío de correos vía AWS SES.
- `tests/` - Pruebas unitarias con Vitest configuradas para los componentes y servicios.

## 🛠️ Stack Tecnológico

- **Frontend:** React 18, TypeScript, Vite, React Router DOM.
- **Backend/Serverless:** Vercel Functions (Node.js, `@vercel/node`).
- **Base de Datos & Auth:** Firebase SDK (Firestore, Auth).
- **Servicio de Correos:** AWS SDK (`@aws-sdk/client-ses`).
- **Testing:** Vitest, Testing Library.
- **Estilos:** Vanilla CSS con metodologías modernas (Variables, Flexbox, CSS Grid).

## 🚀 Despliegue y Configuración

El proyecto está diseñado para ser desplegado instantáneamente en **Vercel**. 
El frontend servirá las páginas estáticas mientras que la carpeta `api/` se desplegará como funciones backend.

### Variables de Entorno Necesarias
Debes configurar las siguientes variables tanto en tu `.env` local como en tu panel de Vercel (en **Settings > Environment Variables**):

#### Firebase (Públicas, prefijo `VITE_`)
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

#### AWS SES (Privadas, solo para Backend Vercel)
```env
AWS_ACCESS_KEY_ID=tu_aws_access_key
AWS_SECRET_ACCESS_KEY=tu_aws_secret_key
AWS_REGION=us-east-1
SES_FROM_ADDRESS=tu_correo_verificado_en_aws@gmail.com
```

### Comandos de Desarrollo Locales
- `npm install` - Instalar dependencias
- `npm run dev` - Iniciar servidor de desarrollo (Vite)
- `npm run test` - Ejecutar suite de pruebas automatizadas
- `npm run build` - Compilar aplicación para producción

## 📝 Notas de AWS Sandbox
Por defecto, las cuentas nuevas de AWS SES se encuentran en el entorno de pruebas (**Sandbox**). Si el sistema devuelve un error indicando falta de autorización, asegúrate de que el correo destinatario esté **verificado** en la consola de AWS SES, o solicita a AWS la salida a producción.
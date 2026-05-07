# MateCode Task Manager

Aplicación SPA de gestión de tareas para pequeñas empresas, desarrollada con React, TypeScript y Firebase.

## Características

- ✅ Autenticación con email/password y Google
- ✅ Gestión completa de tareas (CRUD) con persistencia en Firestore
- ✅ Sincronización en tiempo real
- ✅ Envío de resúmenes por email con AWS SES
- ✅ Interfaz responsive y mobile-first
- ✅ Deploy en Vercel con funciones serverless

## Estructura del proyecto

- `src/pages/` - vistas públicas y privadas
- `src/components/` - UI reusable
- `src/features/` - lógica de dominio del producto
- `src/services/` - integraciones con Firebase y APIs
- `src/hooks/` - hooks personalizados
- `src/routes/` - router + rutas privadas (ProtectedRoute)
- `src/types/` - tipos e interfaces compartidas
- `src/utils/` - utilidades y validaciones
- `functions/` - Vercel Functions para AWS SES
- `tests/` - pruebas unitarias y de componentes

## Scripts disponibles

- `npm run dev` - iniciar servidor de desarrollo
- `npm run build` - compilar para producción
- `npm run preview` - previsualizar build local
- `npm run test` - ejecutar tests con Vitest

## Variables de entorno

Crea un archivo `.env` en la raíz con las claves necesarias:

### Firebase
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### AWS SES
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
SES_FROM_ADDRESS=noreply@yourdomain.com
```

### Vercel API
```
VITE_VERCEL_API_URL=https://your-app.vercel.app
```

## Flujo de envío de emails

1. Usuario hace clic en "Enviar resumen por email" en el dashboard
2. Frontend llama a la Vercel Function `/api/send-tasks-summary`
3. La función serverless usa AWS SES para enviar el email
4. El email incluye un resumen de todas las tareas del usuario

## Notas

Este proyecto está listo para seguir con la implementación de tests y deploy en producción.
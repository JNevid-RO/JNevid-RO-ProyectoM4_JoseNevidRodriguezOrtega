# MateCode Task Manager

Aplicación SPA de gestión de tareas para pequeñas empresas, desarrollada con React, TypeScript y Firebase.

## Estructura del proyecto

- `src/pages/` - vistas públicas y privadas
- `src/components/` - UI reusable
- `src/features/` - lógica de dominio del producto
- `src/services/` - integraciones con Firebase y APIs
- `src/hooks/` - hooks personalizados
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

Crea un archivo `.env` en la raíz con las claves necesarias de Firebase y AWS.

## Notas

Este proyecto está listo para seguir con la implementación de autenticación, CRUD de tareas, Firestore y envíos de correo electrónico desde funciones serverless.

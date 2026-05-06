# Guía de Deploy en Vercel

## Requisitos previos
1. Cuenta en [Vercel](https://vercel.com)
2. Cuenta en [Firebase](https://firebase.google.com)
3. Cuenta en [AWS](https://aws.amazon.com)
4. CLI de Vercel instalado: `npm install -g vercel`

## Paso 1: Configurar Firebase

1. Crea un proyecto en Firebase Console
2. Ve a **Project Settings** → **Service Accounts**
3. Copia las credenciales y llena en `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

4. En Firebase Console, habilita:
   - **Authentication**: Email/Password y Google OAuth
   - **Firestore Database**: Crea BD y establece reglas de seguridad

### Reglas de Firestore recomendadas:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Paso 2: Configurar AWS SES

1. Ve a AWS Console → **SES** (Simple Email Service)
2. Verifica tu dirección de email:
   - En **Verified identities**, añade tu email
   - AWS te enviará un email de confirmación
3. Solicita acceso al **Production Access** (por defecto está en Sandbox)
4. Crea **IAM User** con permisos de SES:
   - Ve a **IAM** → **Users** → **Create User**
   - Asigna policy: `AmazonSESFullAccess`
   - Copia las credenciales
5. Llena en `.env`:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` (ej: `us-east-1`)
   - `SES_FROM_ADDRESS` (el email verificado)

## Paso 3: Deploy en Vercel

### Opción A: Desde la CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Opción B: Desde GitHub
1. Sube el código a GitHub
2. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
3. Clica **New Project**
4. Selecciona tu repositorio de GitHub
5. En **Environment Variables**, añade todas las variables de `.env`:
   - Las variables `VITE_*` van para el frontend (visibles en build)
   - Las variables `AWS_*` y `VITE_VERCEL_API_URL` van para las funciones serverless

## Paso 4: Configurar Variables en Vercel

En el panel de Vercel, bajo **Settings** → **Environment Variables**, añade:

### Para Frontend
```
VITE_FIREBASE_API_KEY=tu_valor
VITE_FIREBASE_AUTH_DOMAIN=tu_valor
VITE_FIREBASE_PROJECT_ID=tu_valor
VITE_FIREBASE_STORAGE_BUCKET=tu_valor
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_valor
VITE_FIREBASE_APP_ID=tu_valor
VITE_VERCEL_API_URL=https://tu-app.vercel.app
```

### Para Vercel Functions
```
AWS_ACCESS_KEY_ID=tu_valor
AWS_SECRET_ACCESS_KEY=tu_valor
AWS_REGION=us-east-1
SES_FROM_ADDRESS=noreply@tudominio.com
```

## Paso 5: Verificar el Deploy

Después del deploy:
1. Verifica que la app esté en `https://tu-app.vercel.app`
2. Prueba el flujo de autenticación
3. Crea una tarea y prueba "Enviar resumen por email"
4. Revisa logs en Vercel Dashboard si hay errores

## Troubleshooting

### Firebase Auth no funciona
- Verifica que los dominios autorizados incluyan `tu-app.vercel.app`
- Ve a **Firebase Console** → **Authentication** → **Settings** → **Authorized domains**

### Email no se envía
- Verifica que SES esté en **Production Access** (no Sandbox)
- Comprueba que `SES_FROM_ADDRESS` es el email verificado en AWS
- Revisa los logs de Vercel en **Functions** → **Logs**

### Variables no disponibles en funciones
- Redeploy después de añadir variables en Vercel
- Las variables `AWS_*` deben estar marcadas como disponibles para **Functions**

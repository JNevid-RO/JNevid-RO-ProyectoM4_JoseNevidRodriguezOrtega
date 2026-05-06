# Comandos de Deploy

## Instalación de Vercel CLI (una sola vez)
```bash
npm install -g vercel
```

## Hacer login en Vercel
```bash
vercel login
```

## Deploy rápido
```bash
# Desde la raíz del proyecto
vercel
```

Vercel te hará preguntas:
- **Scope**: Selecciona tu cuenta personal
- **Project name**: Puedes usar `m4` o el que prefieras
- **Project root**: Presiona Enter (es la raíz actual)
- **Build command**: Presiona Enter (detecta `npm run build`)
- **Output directory**: Presiona Enter (detecta `dist`)
- **Include source maps**: No (responde `n`)

## Después del deploy inicial

### Opción 1: Manage desde CLI
```bash
vercel env pull
```
Esto trae las variables de entorno de Vercel al `.env.local`

### Opción 2: Manage desde Vercel Dashboard
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. **Settings** → **Environment Variables**
4. Añade todas las variables (Firebase + AWS)
5. Haz un nuevo deploy: `vercel`

## Re-deploy después de cambios
```bash
git add .
git commit -m "tu mensaje"
git push

# Si está conectado a GitHub, Vercel automatiza el deploy
# Si quieres forzar deploy:
vercel --prod
```

## Ver logs de funciones
```bash
vercel logs functions/send-tasks-summary.ts
```

## Revisar el estado del deploy
```bash
vercel status
```

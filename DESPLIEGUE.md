# 🚀 Guía de Despliegue - Portafolio

## 📋 Arquitectura
- **Backend**: Render (Node.js + Express)
- **Base de Datos**: Supabase (PostgreSQL)
- **Frontend**: Vercel (React + Vite)

---

## 🗄️ 1. Configurar Supabase

### 1.1 Crear proyecto
1. Ve a [Supabase](https://supabase.com)
2. Crear nuevo proyecto
3. Anota la contraseña de la base de datos

### 1.2 Obtener cadena de conexión
1. Ve a **Settings → Database → Connection string**
2. Selecciona **URI** o **Session Pooler** (recomendado para Render)
3. Si usas **Session Pooler**:
   - Puerto será `6543` en lugar de `5432`
   - Formato: `postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres`
4. Si usas **Direct connection**:
   - Puerto `5432`
   - Formato: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### 1.3 Aplicar esquema Prisma
**Opción A: Desde Render (después del despliegue)**
```bash
# En Render Shell
npm run prisma:push
```

**Opción B: Localmente (sin OneDrive)**
1. Mueve el proyecto fuera de OneDrive temporalmente:
   ```powershell
   # Ejemplo: mover a C:\Proyectos
   Move-Item "C:\Users\juane\OneDrive\Escritorio\PortafolioWebDavid" "C:\Proyectos\PortafolioWebDavid"
   cd C:\Proyectos\PortafolioWebDavid\backend
   ```

2. Ejecuta:
   ```powershell
   npm install
   npx prisma generate
   npx prisma db push
   ```

3. Verifica en Supabase → Table Editor que las tablas fueron creadas

---

## 🖥️ 2. Desplegar Backend en Render

### 2.1 Crear Web Service
1. Ve a [Render](https://render.com)
2. New → **Web Service**
3. Conecta tu repositorio GitHub: `davidramire/Portafolio`
4. Configuración:
   - **Name**: `portfolio-backend` (o el que prefieras)
   - **Region**: Oregon (US West) o el más cercano
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: 
     ```bash
     npm install && npm run prisma:generate
     ```
   - **Start Command**: 
     ```bash
     npm run start
     ```

### 2.2 Variables de Entorno
Agrega estas en **Environment Variables**:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres` (Session Pooler) |
| `PORT` | `5000` (opcional, Render asigna automáticamente) |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://tu-frontend.vercel.app` (actualizar después) |

### 2.3 Primera sincronización de DB
1. Una vez desplegado, ve a **Shell** en Render
2. Ejecuta:
   ```bash
   npm run prisma:push
   ```
3. Verifica que las tablas se crearon en Supabase

### 2.4 Verificar despliegue
1. Copia la URL de Render (ej: `https://portfolio-backend-xxxx.onrender.com`)
2. Prueba en el navegador:
   ```
   https://portfolio-backend-xxxx.onrender.com/health
   ```
3. Deberías ver:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-12-03T...",
     "database": "Supabase PostgreSQL",
     "environment": "production"
   }
   ```

---

## 🎨 3. Desplegar Frontend en Vercel

### 3.1 Importar proyecto
1. Ve a [Vercel](https://vercel.com)
2. **Add New → Project**
3. Importa desde GitHub: `davidramire/Portafolio`
4. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.2 Variables de Entorno (opcional)
Si el frontend consume la API del backend, agrega:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://portfolio-backend-xxxx.onrender.com/api` |

Y en tu código React usa:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Ejemplo de fetch
fetch(`${API_URL}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### 3.3 Desplegar
1. Click en **Deploy**
2. Espera a que compile
3. Copia la URL de Vercel (ej: `https://tu-frontend.vercel.app`)

---

## 🔄 4. Actualizar CORS en Backend

### 4.1 Actualizar variable en Render
1. Ve a Render → tu servicio → **Environment**
2. Edita `FRONTEND_URL` con la URL real de Vercel:
   ```
   https://tu-frontend.vercel.app
   ```
3. **Save Changes** → el servicio se reiniciará automáticamente

### 4.2 Verificar CORS
Desde el frontend en Vercel, prueba hacer una petición al backend. No deberías ver errores CORS en la consola.

---

## ✅ 5. Verificación Final

### 5.1 Endpoints del Backend
Prueba estos endpoints desde el navegador o Postman:

```bash
# Health check
GET https://portfolio-backend-xxxx.onrender.com/health

# Resume completo
GET https://portfolio-backend-xxxx.onrender.com/api/resume

# Información personal
GET https://portfolio-backend-xxxx.onrender.com/api/resume/personal

# Experiencias
GET https://portfolio-backend-xxxx.onrender.com/api/resume/experience

# Educación
GET https://portfolio-backend-xxxx.onrender.com/api/resume/education

# Habilidades
GET https://portfolio-backend-xxxx.onrender.com/api/resume/skills

# Proyectos
GET https://portfolio-backend-xxxx.onrender.com/api/resume/projects

# Certificaciones
GET https://portfolio-backend-xxxx.onrender.com/api/resume/certifications

# Mensajes de contacto (GET)
GET https://portfolio-backend-xxxx.onrender.com/api/contact

# Enviar mensaje (POST)
POST https://portfolio-backend-xxxx.onrender.com/api/contact
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "subject": "Consulta",
  "budget": "$1000-$5000",
  "message": "Hola, me interesa tu portafolio"
}
```

### 5.2 Frontend
1. Abre `https://tu-frontend.vercel.app`
2. Verifica que carga correctamente
3. Si tienes formularios o llamadas a la API, prueba que funcionen sin errores CORS

---

## 🔧 6. Solucionar Problemas Comunes

### Error EPERM en OneDrive
**Problema**: `operation not permitted, rename` al ejecutar `prisma generate`

**Solución**:
1. Mueve el proyecto fuera de OneDrive:
   ```powershell
   Move-Item "C:\Users\juane\OneDrive\Escritorio\PortafolioWebDavid" "C:\Proyectos\PortafolioWebDavid"
   ```
2. O ejecuta desde Render Shell después del despliegue

### No se conecta a Supabase
**Problema**: `P1001: Can't reach database server`

**Solución**:
1. Verifica que el `DATABASE_URL` es correcto
2. Usa **Session Pooler** (puerto `6543`) en lugar de conexión directa
3. En Supabase → Settings → Database → **Connection Pooling** → habilitar

### Error CORS en producción
**Problema**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solución**:
1. Verifica que `FRONTEND_URL` en Render coincide exactamente con la URL de Vercel
2. No incluyas `/` al final
3. Reinicia el servicio en Render después de actualizar

### Render Free Tier se duerme
**Problema**: Primera petición tarda mucho (cold start)

**Solución**:
1. Render free tier duerme después de 15 min de inactividad
2. Primera petición puede tardar 30-60 segundos
3. Considera upgrade a plan pagado si necesitas uptime constante
4. Alternativa: usa un servicio de "keep-alive" como UptimeRobot (gratis)

---

## 📝 Notas Adicionales

### Actualizar esquema de base de datos
Cuando agregues o modifiques modelos en `prisma/schema.prisma`:

```bash
# Localmente (después de mover de OneDrive)
npx prisma generate
npx prisma db push

# O en Render Shell
npm run prisma:push
```

### Ver datos en Supabase
1. Supabase → Table Editor
2. Aquí puedes ver y editar manualmente todos los registros

### Logs en Render
1. Render → tu servicio → **Logs**
2. Aquí verás errores y logs de Node.js

### Variables de entorno locales
Recuerda que `.env` NO se sube a GitHub (está en `.gitignore`)
- En Render: configura manualmente las variables
- En Vercel: configura manualmente las variables
- En local: usa el archivo `.env`

---

## 🎉 ¡Listo!

Ahora tu portafolio está completamente desplegado:
- ✅ Backend en Render con API REST
- ✅ Base de datos PostgreSQL en Supabase
- ✅ Frontend en Vercel

### URLs finales:
- **Backend**: `https://portfolio-backend-xxxx.onrender.com`
- **Frontend**: `https://tu-frontend.vercel.app`
- **DB Admin**: Supabase Dashboard

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render
2. Verifica las variables de entorno
3. Prueba los endpoints con Postman
4. Revisa la consola del navegador para errores del frontend

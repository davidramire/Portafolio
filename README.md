# Portafolio

Portafolio personal que muestra proyectos, habilidades y un formulario de contacto. Backend en Node.js + Express + Prisma (PostgreSQL) y frontend en React + Vite + Tailwind CSS.

Descripción
- Proyecto para mostrar el portafolio profesional de David Ramírez, con secciones de proyectos, habilidades, experiencia y un formulario de contacto que persiste mensajes en PostgreSQL usando Prisma.

Stack técnico
- Frontend: React (Vite), Tailwind CSS, lucide-react
- Backend: Node.js, Express, TypeScript, Prisma (PostgreSQL)
- Base de datos: PostgreSQL

Estructura del repositorio
- `frontend/` — aplicación React + Vite
- `backend/` — API en TypeScript con Express y Prisma
- `backend/prisma/schema.prisma` — esquema de datos

Requisitos previos
- Node.js (≥16)
- npm o yarn
- PostgreSQL en ejecución (local o remoto)

Configuración (local)
1. Clonar el repositorio y abrir la carpeta raíz:

```powershell
git clone https://github.com/davidramire/Portafolio.git
cd Portafolio
```

2. Backend: crear `.env` en `backend/` (copia el formato si existe `.env.example`) y configurar la URL de la base de datos:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=5000
FRONTEND_URL=http://localhost:5174
```

3. Instalar dependencias y generar Prisma Client:

```powershell
cd backend
npm install
npx prisma generate
```

4. Levantar backend en modo desarrollo:

```powershell
npm run dev
```

5. Frontend: en otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

Prisma / Base de datos
- Si quieres sincronizar el esquema con la base de datos local (CUIDADO: `--accept-data-loss` puede eliminar datos):

```powershell
cd backend
npx prisma db push --accept-data-loss
```

O usa migraciones con:

```powershell
npx prisma migrate dev
```

Cómo probar
- El frontend comunica con `http://localhost:5000` (configurable vía `.env`).
- El formulario de contacto envía POST a `/api/contact` y los datos se guardan en la tabla `contact_messages`.
- Puedes abrir Prisma Studio:

```powershell
cd backend
npm run prisma:studio
# abre: http://localhost:5555
```

Buenas prácticas
- Nunca subas archivos `.env` o secretos al repositorio. `.gitignore` ya está configurado para excluirlos.
- Para despliegue usa proveedores que ofrezcan variables de entorno seguras (Vercel, Render, Railway, Heroku, etc.).

Contribuir
- Abre un issue o un pull request con cambios propuestos.

Contacto
- Email en el footer del sitio o vía GitHub: https://github.com/davidramire

---
_Generado automáticamente por el asistente local. Ajusta la sección de despliegue y credenciales según tu flujo._

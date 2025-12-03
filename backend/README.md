# Portfolio Backend - PostgreSQL + Express + Prisma

Backend API para portafolio con formulario de contacto y generador de CV dinámico.

## 🛠 Stack Tecnológico

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **pgAdmin** - Administrador de base de datos

## 📋 Requisitos Previos

- Node.js 18+ instalado
- PostgreSQL 14+ instalado
- pgAdmin 4 instalado (opcional pero recomendado)

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar PostgreSQL

#### Opción A: Con pgAdmin

1. Abre pgAdmin
2. Crea un nuevo servidor (si no existe)
3. Crea una nueva base de datos llamada `portfolio`

#### Opción B: Con línea de comandos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE portfolio;
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env`:

```bash
copy .env.example .env
```

Edita `.env` y configura tu conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:tuPassword@localhost:5432/portfolio?schema=public"
PORT=5000
FRONTEND_URL=http://localhost:5174
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD=tuPassword
```

### 4. Ejecutar migraciones de Prisma

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Crear tablas en la base de datos
npm run prisma:push

# O usar migraciones (recomendado para producción)
npm run prisma:migrate
```

### 5. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:5000`

## 📊 Ver la base de datos

### Con Prisma Studio (Interfaz visual)

```bash
npm run prisma:studio
```

Abre automáticamente en `http://localhost:5555`

### Con pgAdmin

1. Abre pgAdmin
2. Conecta al servidor
3. Navega a: Servers > PostgreSQL > Databases > portfolio > Schemas > public > Tables

## 📡 API Endpoints

### Contacto

```
POST   /api/contact          - Guardar mensaje de contacto
GET    /api/contact          - Obtener todos los mensajes (admin)
PATCH  /api/contact/:id/status - Actualizar estado del mensaje
```

### CV/Resume

```
# Información Personal
GET    /api/resume/personal       - Obtener info personal
POST   /api/resume/personal       - Crear/Actualizar info personal

# Experiencias
GET    /api/resume/experiences    - Obtener todas las experiencias
POST   /api/resume/experiences    - Crear experiencia
PUT    /api/resume/experiences/:id - Actualizar experiencia
DELETE /api/resume/experiences/:id - Eliminar experiencia

# Educación
GET    /api/resume/education      - Obtener educación
POST   /api/resume/education      - Crear educación
PUT    /api/resume/education/:id  - Actualizar educación
DELETE /api/resume/education/:id  - Eliminar educación

# Habilidades
GET    /api/resume/skills         - Obtener habilidades
POST   /api/resume/skills         - Crear habilidad
PUT    /api/resume/skills/:id     - Actualizar habilidad
DELETE /api/resume/skills/:id     - Eliminar habilidad

# Proyectos
GET    /api/resume/projects       - Obtener proyectos
POST   /api/resume/projects       - Crear proyecto
PUT    /api/resume/projects/:id   - Actualizar proyecto
DELETE /api/resume/projects/:id   - Eliminar proyecto

# Certificaciones
GET    /api/resume/certifications    - Obtener certificaciones
POST   /api/resume/certifications    - Crear certificación
PUT    /api/resume/certifications/:id - Actualizar certificación
DELETE /api/resume/certifications/:id - Eliminar certificación

# CV Completo
GET    /api/resume/complete       - Obtener CV completo con todas las secciones
```

## 🔄 Scripts Disponibles

```bash
npm run dev              # Iniciar en modo desarrollo
npm run build            # Compilar TypeScript
npm start                # Iniciar servidor compilado
npm run prisma:generate  # Generar cliente Prisma
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:push      # Sincronizar schema sin migraciones
npm run prisma:studio    # Abrir Prisma Studio
```

## 📝 Estructura de la Base de Datos

### Tablas Principales

1. **contact_messages** - Mensajes del formulario de contacto
2. **personal_info** - Información personal del CV
3. **experiences** - Experiencias laborales
4. **education** - Educación
5. **skills** - Habilidades técnicas
6. **projects** - Proyectos destacados
7. **certifications** - Certificaciones

## 🔧 Desarrollo

### Modificar el Schema

1. Edita `prisma/schema.prisma`
2. Ejecuta `npm run prisma:push` para sincronizar cambios
3. O crea una migración: `npx prisma migrate dev --name tu_cambio`

### Ver logs de queries

Prisma está configurado para mostrar logs de queries en desarrollo. Revisa la consola del servidor.

## 🚀 Producción

### Variables de entorno para producción

```env
DATABASE_URL="postgresql://usuario:password@host:5432/portfolio?schema=public"
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://tu-dominio.com
```

### Deploy

1. Compila el proyecto: `npm run build`
2. Ejecuta migraciones: `npm run prisma:migrate`
3. Inicia el servidor: `npm start`

## 🐛 Troubleshooting

### Error de conexión a PostgreSQL

- Verifica que PostgreSQL esté corriendo
- Confirma usuario y contraseña en DATABASE_URL
- Asegúrate que el puerto 5432 esté disponible

### Errores de Prisma

```bash
# Regenerar cliente
npm run prisma:generate

# Resetear base de datos (⚠️ Elimina todos los datos)
npx prisma migrate reset
```

### Puerto en uso

Si el puerto 5000 está ocupado, cámbialo en `.env`:

```env
PORT=5001
```

## 📚 Documentación

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Express Docs](https://expressjs.com/)

## 📧 Soporte

Para problemas o preguntas, contacta a: tu@email.com

-- ============================================
-- SQL COMPLETO PARA POSTGRESQL - PORTFOLIO
-- ============================================

-- Crear la base de datos (si no existe)
-- CREATE DATABASE portfolio;

-- Conectarse a la base de datos portfolio antes de ejecutar lo siguiente

-- ============================================
-- TABLA: ContactMessage
-- Almacena los mensajes del formulario de contacto
-- ============================================
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "budget" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS "ContactMessage_email_idx" ON "ContactMessage"("email");

-- Índice para filtrar por estado
CREATE INDEX IF NOT EXISTS "ContactMessage_status_idx" ON "ContactMessage"("status");

-- ============================================
-- TABLA: PersonalInfo
-- Información personal del CV/Resume
-- ============================================
CREATE TABLE IF NOT EXISTS "PersonalInfo" (
    "id" SERIAL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "summary" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: Experience
-- Experiencia laboral
-- ============================================
CREATE TABLE IF NOT EXISTS "Experience" (
    "id" SERIAL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "achievements" TEXT[],
    "technologies" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar experiencias
CREATE INDEX IF NOT EXISTS "Experience_order_idx" ON "Experience"("order");

-- ============================================
-- TABLA: Education
-- Educación y formación académica
-- ============================================
CREATE TABLE IF NOT EXISTS "Education" (
    "id" SERIAL PRIMARY KEY,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "gpa" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar educación
CREATE INDEX IF NOT EXISTS "Education_order_idx" ON "Education"("order");

-- ============================================
-- TABLA: Skill
-- Habilidades técnicas y soft skills
-- ============================================
CREATE TABLE IF NOT EXISTS "Skill" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 50,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para filtrar por categoría
CREATE INDEX IF NOT EXISTS "Skill_category_idx" ON "Skill"("category");

-- Índice para ordenar skills
CREATE INDEX IF NOT EXISTS "Skill_order_idx" ON "Skill"("order");

-- ============================================
-- TABLA: Project
-- Proyectos destacados del portafolio
-- ============================================
CREATE TABLE IF NOT EXISTS "Project" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "technologies" TEXT[],
    "highlights" TEXT[],
    "imageUrl" TEXT,
    "demoUrl" TEXT,
    "repoUrl" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para proyectos destacados
CREATE INDEX IF NOT EXISTS "Project_featured_idx" ON "Project"("featured");

-- Índice para ordenar proyectos
CREATE INDEX IF NOT EXISTS "Project_order_idx" ON "Project"("order");

-- ============================================
-- TABLA: Certification
-- Certificaciones y cursos completados
-- ============================================
CREATE TABLE IF NOT EXISTS "Certification" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "credentialUrl" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar certificaciones
CREATE INDEX IF NOT EXISTS "Certification_order_idx" ON "Certification"("order");

-- ============================================
-- TABLA: ResumeSection
-- Secciones personalizadas adicionales del CV
-- ============================================
CREATE TABLE IF NOT EXISTS "ResumeSection" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar secciones
CREATE INDEX IF NOT EXISTS "ResumeSection_order_idx" ON "ResumeSection"("order");

-- Índice para filtrar secciones visibles
CREATE INDEX IF NOT EXISTS "ResumeSection_visible_idx" ON "ResumeSection"("visible");

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar información personal de ejemplo
INSERT INTO "PersonalInfo" (
    "fullName", 
    "title", 
    "email", 
    "phone", 
    "location", 
    "linkedin", 
    "github",
    "summary"
) VALUES (
    'David Ramirez',
    'Full Stack Developer',
    'davidramirezv.0816@gmail.com',
    '+57 300 123 4567',
    'Colombia',
    'https://www.linkedin.com/in/david-ramirez-81b81a260/',
    'https://github.com/davidramire',
    'Desarrollador Full Stack apasionado por crear soluciones web innovadoras y escalables. Especializado en React, Node.js y tecnologías modernas.'
)
ON CONFLICT DO NOTHING;

-- Insertar experiencia de ejemplo
INSERT INTO "Experience" (
    "position",
    "company",
    "location",
    "startDate",
    "endDate",
    "current",
    "description",
    "achievements",
    "technologies",
    "order"
) VALUES 
(
    'Full Stack Developer',
    'Tech Solutions Inc.',
    'Remote',
    '2023-01-01',
    NULL,
    true,
    'Desarrollo de aplicaciones web full stack utilizando tecnologías modernas',
    ARRAY['Implementé arquitectura de microservicios que mejoró la escalabilidad en 300%', 'Reduje el tiempo de carga de la aplicación en un 60%', 'Lideré un equipo de 5 desarrolladores'],
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    1
),
(
    'Frontend Developer',
    'Digital Agency',
    'Bogotá, Colombia',
    '2021-06-01',
    '2022-12-31',
    false,
    'Desarrollo de interfaces de usuario modernas y responsivas',
    ARRAY['Desarrollé 15+ landing pages con conversión promedio de 8%', 'Implementé sistema de diseño reutilizable', 'Mejoré el performance web en un 50%'],
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    2
)
ON CONFLICT DO NOTHING;

-- Insertar educación de ejemplo
INSERT INTO "Education" (
    "degree",
    "institution",
    "location",
    "startDate",
    "endDate",
    "current",
    "description",
    "order"
) VALUES 
(
    'Ingeniería de Sistemas',
    'Universidad Nacional de Colombia',
    'Bogotá, Colombia',
    '2018-01-01',
    '2023-06-01',
    false,
    'Énfasis en desarrollo de software y arquitectura de sistemas',
    1
)
ON CONFLICT DO NOTHING;

-- Insertar habilidades de ejemplo
INSERT INTO "Skill" ("name", "category", "level", "order") VALUES 
-- Frontend
('React', 'Frontend', 90, 1),
('JavaScript/TypeScript', 'Frontend', 85, 2),
('HTML/CSS', 'Frontend', 90, 3),
('Tailwind CSS', 'Frontend', 85, 4),
('Vue.js', 'Frontend', 70, 5),

-- Backend
('Node.js', 'Backend', 85, 6),
('Express.js', 'Backend', 85, 7),
('PostgreSQL', 'Backend', 80, 8),
('MongoDB', 'Backend', 75, 9),
('REST APIs', 'Backend', 90, 10),
('GraphQL', 'Backend', 70, 11),

-- DevOps
('Git', 'DevOps', 85, 12),
('Docker', 'DevOps', 75, 13),
('AWS', 'DevOps', 70, 14),
('CI/CD', 'DevOps', 75, 15),

-- Design
('Figma', 'Design', 80, 16),
('UI/UX Design', 'Design', 75, 17),
('Responsive Design', 'Design', 90, 18)
ON CONFLICT DO NOTHING;

-- Insertar proyectos de ejemplo
INSERT INTO "Project" (
    "title",
    "description",
    "category",
    "technologies",
    "highlights",
    "demoUrl",
    "repoUrl",
    "featured",
    "order"
) VALUES 
(
    'E-Commerce Platform',
    'Plataforma de comercio electrónico completa con pasarela de pagos, gestión de inventario y panel de administración.',
    'Web Development',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
    ARRAY['Sistema de pagos integrado con Stripe', 'Panel de administración en tiempo real', 'Optimizado para SEO'],
    'https://demo.example.com',
    'https://github.com/davidramire/ecommerce',
    true,
    1
),
(
    'Fitness Tracker App',
    'Aplicación móvil para seguimiento de ejercicios y nutrición con sincronización en tiempo real.',
    'Mobile App',
    ARRAY['React Native', 'Firebase', 'Redux'],
    ARRAY['Sincronización offline-first', 'Integración con wearables', 'Dashboard de análisis'],
    'https://app.example.com',
    'https://github.com/davidramire/fitness-tracker',
    true,
    2
)
ON CONFLICT DO NOTHING;

-- Insertar certificaciones de ejemplo
INSERT INTO "Certification" (
    "name",
    "issuer",
    "issueDate",
    "credentialId",
    "credentialUrl",
    "order"
) VALUES 
(
    'AWS Certified Solutions Architect',
    'Amazon Web Services',
    '2024-03-15',
    'AWS-12345678',
    'https://aws.amazon.com/verification',
    1
),
(
    'React Advanced Certification',
    'Meta',
    '2023-09-20',
    'META-87654321',
    'https://coursera.org/verify',
    2
)
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para actualizar automáticamente updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updatedAt en todas las tablas
CREATE TRIGGER update_contact_message_updated_at BEFORE UPDATE ON "ContactMessage" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON "PersonalInfo" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON "Experience" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON "Education" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_updated_at BEFORE UPDATE ON "Skill" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_updated_at BEFORE UPDATE ON "Project" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certification_updated_at BEFORE UPDATE ON "Certification" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resume_section_updated_at BEFORE UPDATE ON "ResumeSection" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CONSULTAS ÚTILES PARA VERIFICAR
-- ============================================

-- Ver todos los mensajes de contacto
-- SELECT * FROM "ContactMessage" ORDER BY "createdAt" DESC;

-- Ver información personal
-- SELECT * FROM "PersonalInfo";

-- Ver todas las experiencias ordenadas
-- SELECT * FROM "Experience" ORDER BY "order", "startDate" DESC;

-- Ver habilidades por categoría
-- SELECT "category", COUNT(*) as total, AVG("level") as nivel_promedio 
-- FROM "Skill" 
-- GROUP BY "category";

-- Ver proyectos destacados
-- SELECT * FROM "Project" WHERE "featured" = true ORDER BY "order";

-- Ver certificaciones activas (no expiradas)
-- SELECT * FROM "Certification" 
-- WHERE "expiryDate" IS NULL OR "expiryDate" > CURRENT_TIMESTAMP
-- ORDER BY "issueDate" DESC;

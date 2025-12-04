const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL || 'http://localhost:5174'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint - API information
app.get('/', (req, res) => {
  res.json({
    name: 'Portfolio API',
    version: '1.0.0',
    status: 'running',
    description: 'Backend API para portafolio con Supabase PostgreSQL',
    endpoints: {
      health: 'GET /health',
      contact: {
        create: 'POST /api/contact',
        list: 'GET /api/contact'
      },
      resume: {
        full: 'GET /api/resume',
        personal: 'GET /api/resume/personal',
        experience: 'GET /api/resume/experience',
        education: 'GET /api/resume/education',
        skills: 'GET /api/resume/skills',
        projects: 'GET /api/resume/projects',
        certifications: 'GET /api/resume/certifications'
      }
    },
    documentation: 'https://github.com/davidramire/Portafolio'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'Supabase PostgreSQL',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact endpoints
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, budget, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Campos requeridos: name, email, subject, message'
      });
    }

    // Create contact message
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        budget: budget || null,
        message,
        ipAddress: req.ip || req.connection.remoteAddress,
        status: 'new'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Mensaje de contacto recibido',
      data: {
        id: contactMessage.id,
        createdAt: contactMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      error: 'Error al enviar el mensaje',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    const where = status ? { status } : {};

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const total = await prisma.contactMessage.count({ where });

    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      error: 'Error al obtener mensajes',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Resume endpoints
app.get('/api/resume/personal', async (req, res) => {
  try {
    const personalInfo = await prisma.personalInfo.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: personalInfo
    });
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({
      error: 'Error al obtener información personal',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/resume/experience', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({
      error: 'Error al obtener experiencias',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/resume/education', async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: education
    });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({
      error: 'Error al obtener educación',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/resume/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    });

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedSkills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({
      error: 'Error al obtener habilidades',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/resume/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      error: 'Error al obtener proyectos',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/resume/certifications', async (req, res) => {
  try {
    const certifications = await prisma.certification.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: certifications
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({
      error: 'Error al obtener certificaciones',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Full resume endpoint (all sections)
app.get('/api/resume', async (req, res) => {
  try {
    const [personalInfo, experiences, education, skills, projects, certifications] = await Promise.all([
      prisma.personalInfo.findFirst({ orderBy: { createdAt: 'desc' } }),
      prisma.experience.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.education.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.skill.findMany({ where: { isVisible: true }, orderBy: [{ category: 'asc' }, { order: 'asc' }] }),
      prisma.project.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.certification.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } })
    ]);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        personalInfo,
        experiences,
        education,
        skills: groupedSkills,
        projects,
        certifications
      }
    });
  } catch (error) {
    console.error('Error fetching full resume:', error);
    res.status(500).json({
      error: 'Error al obtener currículum completo',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔌 Cerrando conexiones...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔌 Cerrando conexiones...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📧 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`💾 Base de datos: Supabase PostgreSQL`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n✅ Endpoints disponibles:`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/contact`);
  console.log(`   GET  /api/contact`);
  console.log(`   GET  /api/resume`);
  console.log(`   GET  /api/resume/personal`);
  console.log(`   GET  /api/resume/experience`);
  console.log(`   GET  /api/resume/education`);
  console.log(`   GET  /api/resume/skills`);
  console.log(`   GET  /api/resume/projects`);
  console.log(`   GET  /api/resume/certifications`);
});

module.exports = app;

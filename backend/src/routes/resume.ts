import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// ==================== PERSONAL INFO ====================

// GET /api/resume/personal - Obtener info personal
router.get('/personal', async (req: Request, res: Response) => {
  try {
    const personalInfo = await prisma.personalInfo.findFirst();
    res.json({ personalInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener información personal' });
  }
});

// POST /api/resume/personal - Crear/Actualizar info personal
router.post('/personal', async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Verificar si ya existe
    const existing = await prisma.personalInfo.findFirst();

    let personalInfo;
    if (existing) {
      personalInfo = await prisma.personalInfo.update({
        where: { id: existing.id },
        data
      });
    } else {
      personalInfo = await prisma.personalInfo.create({ data });
    }

    res.json({ success: true, personalInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al guardar información personal' });
  }
});

// ==================== EXPERIENCES ====================

// GET /api/resume/experiences - Obtener todas las experiencias
router.get('/experiences', async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json({ experiences });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener experiencias' });
  }
});

// POST /api/resume/experiences - Crear experiencia
router.post('/experiences', async (req: Request, res: Response) => {
  try {
    const experience = await prisma.experience.create({
      data: req.body
    });
    res.status(201).json({ success: true, experience });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear experiencia' });
  }
});

// PUT /api/resume/experiences/:id - Actualizar experiencia
router.put('/experiences/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await prisma.experience.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, experience });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar experiencia' });
  }
});

// DELETE /api/resume/experiences/:id - Eliminar experiencia
router.delete('/experiences/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ success: true, message: 'Experiencia eliminada' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar experiencia' });
  }
});

// ==================== EDUCATION ====================

// GET /api/resume/education - Obtener educación
router.get('/education', async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json({ education });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener educación' });
  }
});

// POST /api/resume/education - Crear educación
router.post('/education', async (req: Request, res: Response) => {
  try {
    const education = await prisma.education.create({
      data: req.body
    });
    res.status(201).json({ success: true, education });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear educación' });
  }
});

// PUT /api/resume/education/:id - Actualizar educación
router.put('/education/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const education = await prisma.education.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, education });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar educación' });
  }
});

// DELETE /api/resume/education/:id - Eliminar educación
router.delete('/education/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    res.json({ success: true, message: 'Educación eliminada' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar educación' });
  }
});

// ==================== SKILLS ====================

// GET /api/resume/skills - Obtener habilidades
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json({ skills });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener habilidades' });
  }
});

// POST /api/resume/skills - Crear habilidad
router.post('/skills', async (req: Request, res: Response) => {
  try {
    const skill = await prisma.skill.create({
      data: req.body
    });
    res.status(201).json({ success: true, skill });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear habilidad' });
  }
});

// PUT /api/resume/skills/:id - Actualizar habilidad
router.put('/skills/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await prisma.skill.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, skill });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar habilidad' });
  }
});

// DELETE /api/resume/skills/:id - Eliminar habilidad
router.delete('/skills/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ success: true, message: 'Habilidad eliminada' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar habilidad' });
  }
});

// ==================== PROJECTS ====================

// GET /api/resume/projects - Obtener proyectos
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json({ projects });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// POST /api/resume/projects - Crear proyecto
router.post('/projects', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
});

// PUT /api/resume/projects/:id - Actualizar proyecto
router.put('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar proyecto' });
  }
});

// DELETE /api/resume/projects/:id - Eliminar proyecto
router.delete('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: 'Proyecto eliminado' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
});

// ==================== CERTIFICATIONS ====================

// GET /api/resume/certifications - Obtener certificaciones
router.get('/certifications', async (req: Request, res: Response) => {
  try {
    const certifications = await prisma.certification.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });
    res.json({ certifications });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener certificaciones' });
  }
});

// POST /api/resume/certifications - Crear certificación
router.post('/certifications', async (req: Request, res: Response) => {
  try {
    const certification = await prisma.certification.create({
      data: req.body
    });
    res.status(201).json({ success: true, certification });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al crear certificación' });
  }
});

// PUT /api/resume/certifications/:id - Actualizar certificación
router.put('/certifications/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certification = await prisma.certification.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, certification });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al actualizar certificación' });
  }
});

// DELETE /api/resume/certifications/:id - Eliminar certificación
router.delete('/certifications/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.certification.delete({ where: { id } });
    res.json({ success: true, message: 'Certificación eliminada' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al eliminar certificación' });
  }
});

// ==================== GET COMPLETE RESUME ====================

// GET /api/resume/complete - Obtener CV completo
router.get('/complete', async (req: Request, res: Response) => {
  try {
    const [personalInfo, experiences, education, skills, projects, certifications] = await Promise.all([
      prisma.personalInfo.findFirst(),
      prisma.experience.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.education.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.skill.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.project.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }),
      prisma.certification.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } })
    ]);

    res.json({
      personalInfo,
      experiences,
      education,
      skills,
      projects,
      certifications
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener CV completo' });
  }
});

export default router;

import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// POST /api/contact - Guardar mensaje de contacto
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, budget, message } = req.body;

    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Campos requeridos: name, email, message'
      });
    }

    // Limpiar y validar email
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(cleanEmail)) {
      console.log('❌ Email rechazado:', cleanEmail);
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Obtener IP
    const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;

    // Guardar en PostgreSQL
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        subject: subject ? subject.trim() : 'Sin asunto',
        budget: budget || null,
        message: message.trim(),
        ipAddress: ipAddress || null,
        status: 'new'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: {
        id: contactMessage.id,
        createdAt: contactMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Error guardando mensaje:', error);
    res.status(500).json({
      error: 'Error al enviar el mensaje'
    });
  }
});

// GET /api/contact - Obtener todos los mensajes (admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ messages });
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// PATCH /api/contact/:id/status - Actualizar estado del mensaje
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        error: 'Status debe ser: new, read o replied'
      });
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });

    res.json({ success: true, message });
  } catch (error) {
    console.error('Error actualizando mensaje:', error);
    res.status(500).json({ error: 'Error al actualizar mensaje' });
  }
});

export default router;

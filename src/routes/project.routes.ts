import { Router } from 'express';
import { getProjects } from '../controllers/project.controller';

const router = Router();

// GET /api/projects
router.get('/', getProjects);

export default router;

import { Request, Response } from 'express';
import pool from '../config/database';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Projeleri getirirken hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};


import { Request, Response, NextFunction } from 'express';
import pool from '../config/db'; 

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Burada "await" olarak düzelttim:
    const result = await pool.query('SELECT * FROM projects');
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error); 
  }
};


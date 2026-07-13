import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kurumsal HTTP İstek Loglama Modülü
app.use((req: Request, _res: Response, next: NextFunction): void => {
  logger.http(`${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// Üretime Hazır Sağlık Kontrolü (Health Check) Endpoint'i
app.get('/api/v1/health', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'success',
    service: 'projecthub-backend',
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Küresel Hata Yakalama Sınırı (Global Error Boundary)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error(`Unhandled Exception: ${err.message} \nStack: ${err.stack}`);
  
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Sunucu tarafında dahili bir hata oluştu.'
  });
});

app.listen(PORT, (): void => {
  logger.info(`🚀 ProjectHub Enterprise Engine running on port ${PORT}`);
});


import pg from 'pg';
import logger from '../utils/logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Havuz ilk bağlantıyı kurduğunda tetiklenir
pool.on('connect', (): void => {
  logger.info('🐘 PostgreSQL veritabanı havuzu başarıyla başlatıldı.');
});

// Boştaki bağlantılarda oluşabilecek beklenmedik hataları yakalar
pool.on('error', (err: Error): void => {
  logger.error('🚨 Beklenmedik veritabanı havuzu hatası:', err.message);
});

export default pool;

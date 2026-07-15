import express from 'express';
import projectRoutes from './routes/project.routes';

const app = express();

// Gelen JSON verilerini okuyabilmek için
app.use(express.json());

// Oluşturduğumuz rotayı uygulamaya bağlıyoruz
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

export default app;


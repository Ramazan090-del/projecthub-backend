import pool from './database';

const initializeDatabase = async () => {
  try {
    console.log('Veritabanı kurulumu başlatılıyor...');
    
    // 1. Tabloyu oluştur
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Proje tablosu başarıyla kontrol edildi/oluşturuldu.');

    // 2. Tablo boş mu kontrol et
    const checkTable = await pool.query('SELECT COUNT(*) FROM projects');
    const count = parseInt(checkTable.rows[0].count, 10);
    
    // 3. Tablo boşsa örnek verileri ekle
    if (count === 0) {
      await pool.query(`
        INSERT INTO projects (title, description, status) VALUES 
        ('ProjectHub Backend', 'Express ve PostgreSQL ile geliştirilen yönetim paneli backend sistemi.', 'in-progress'),
        ('E-Ticaret Mobil Uygulama', 'React Native ile hazırlanan mikro-ticaret projesi.', 'pending');
      `);
      console.log('✓ Örnek projeler veritabanına eklendi!');
    } else {
      console.log('✓ Tabloda zaten veri var, yeni ekleme yapılmadı.');
    }

    console.log('Veritabanı kurulumu başarıyla tamamlandı!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Veritabanı kurulumu sırasında hata oluştu:', error);
    process.exit(1);
  }
};

initializeDatabase();

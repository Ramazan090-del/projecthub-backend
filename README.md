# ProjectHub - Yapay Zeka Destekli Proje Yönetim Platformu

## Mimari Kararlar (Architecture Decisions)
Bu proje, üretime hazır (production-ready) kurumsal standartlarda bir SaaS ürünü olarak tasarlanmıştır.

### 1. Katmanlı Mimari (Layered Architecture)
Sürdürülebilirlik ve test edilebilirlik için kod tabanı sıkı bağlardan arındırılmış (loosely coupled) katmanlara ayrılmıştır:
- **src/routes:** HTTP uç noktalarını ve yönlendirmeleri tanımlar.
- **src/controllers:** İstek doğrulama ve HTTP yanıt yönetimini üstlenir.
- **src/utils:** Loglama ve ortak yardımcı araçları barındırır.

### 2. Güvenlik ve Yapılandırılmış Kayıt
- Gelişmiş hata yakalama sınırları (Global Error Boundary) ile sunucu kararlılığı güvenceye alınmıştır.
- `winston` motoru kullanılarak yapılandırılmış loglama (structured logging) altyapısı kurulmuştur.
- 

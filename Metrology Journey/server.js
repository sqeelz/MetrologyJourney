const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk mengambil konten dinamis
app.get('/api/content', (req, res) => {
    // Data konten dinamis sebagai contoh
    const content = [
        { title: 'Pengembangan Soft Skill', content: 'Konten tentang pengembangan soft skill...', category: 'Soft Skill' },
        { title: 'Proyek Metrologi Terbaru', content: 'Informasi tentang proyek metrologi terbaru...', category: 'Metrologi' },
        // Tambahkan konten lainnya sesuai kebutuhan
    ];
    res.json(content);
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

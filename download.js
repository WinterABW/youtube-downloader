// download.js
import { spawn } from 'child_process';

const url = process.argv[2];

if (!url) {
    console.error('❌ Debes proporcionar una URL de YouTube como argumento.');
    process.exit(1);
}

console.log('📥 Descargando con yt-dlp...\n');

const downloader = spawn('yt-dlp.exe', [
  '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best',
  '-o', '%(title)s.%(ext)s',
  url
], {
  stdio: 'inherit'
});


downloader.on('error', (err) => {
    console.error('❌ Error al ejecutar yt-dlp:', err.message);
});

downloader.on('close', (code) => {
    if (code === 0) {
        console.log('\n✅ Descarga completada.');
    } else {
        console.error(`\n❌ yt-dlp terminó con código de salida ${code}`);
    }
});

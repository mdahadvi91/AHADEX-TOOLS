const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const targetDir = './public/images/blog';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// রিয়েল Unsplash ছবির ম্যাপিং (ব্লগের টপিক অনুযায়ী)
const imageMap = {
  // Image Tools
  'how-to-compress-images-without-losing-quality': 'photo-1542744173-8e7e53415bb0',
  'jpg-vs-png-vs-webp-which-format': 'photo-1561070791-2526d30994b5',
  'image-sizes-social-media-2026-guide': 'photo-1611162617474-5b21e879e113',
  'image-to-sketch-cartoon-how-it-works': 'photo-1513364776144-60967b0f800f',
  'image-cropping-guide-aspect-ratios': 'photo-1520390138845-fd2d229dd553',
  'how-to-merge-images-into-one': 'photo-1441974231531-c6227db76b6e',
  'how-to-convert-heic-to-jpg': 'photo-1512499617640-c74ae3a79d37',
  'how-to-remove-background-from-photos': 'photo-1528459801416-a9e53bbf4e17',
  'how-to-create-favicon-from-logo': 'photo-1541462608143-67571c6738dd',
  'how-to-add-watermark-to-photos': 'photo-1516035069371-29a1b244cc32',
  
  // PDF Tools
  'merge-pdf-files-online-complete-guide': 'photo-1568667256549-094345857637',
  'convert-jpg-to-pdf-complete-guide': 'photo-1586075010923-2dd4570fb338',
  'pdf-to-jpg-when-and-why': 'photo-1544377193-33dcf4d68fb5',
  'how-to-reduce-pdf-file-size': 'photo-1618044733300-9472054094ee',
  
  // Developer / Text Tools
  'json-formatter-complete-developer-guide': 'photo-1555066931-4365d14bab8c',
  'base64-encoding-explained-beginner-guide': 'photo-1526374965328-7f61d4dc18c5',
  'url-encoding-explained-special-characters': 'photo-1451187580459-43490279c0fa',
  'json-vs-xml-complete-comparison': 'photo-1558494949-ef010cbdcc31',
  'uuid-v4-vs-v7-when-to-use-each': 'photo-1544383835-bda2bc66a55d',
  'title-case-vs-sentence-case-writing-guide': 'photo-1455390582262-044cdead2708',
  'word-count-guide-writing-content': 'photo-1517842645767-c639042777db',
  'twitter-character-limit-guide-2026': 'photo-1611605698335-8b1569810432',
  'barcode-vs-qr-code-when-to-use': 'photo-1595079676339-1534801ad6cf',
  'qr-codes-business-cards-marketing': 'photo-1589829545856-d10d557cf95f',
  
  // Security / Privacy
  'strong-password-generator-complete-guide': 'photo-1550439062-609e1531270e',
  'what-is-exif-metadata-privacy-guide': 'photo-1550751827-4bd374c3f58b',
  'how-to-protect-online-privacy-2026': 'photo-1526374965328-7f61d4dc18c5',
  
  // Others
  'favicon-complete-guide-website-icons': 'photo-1461749280684-dccba630e2f6',
  'best-free-tools-for-students-2026': 'photo-1523240795612-9a054b0db644',
  'professional-cv-writing-tips-2026': 'photo-1586281380349-632531db7ed4',
  'youtube-thumbnail-design-guide': 'photo-1611162616305-c69b3fa7fbe0',
  'email-attachment-size-limits-guide': 'photo-1557200134-90327ee9fafa',
  'color-picker-guide-web-design': 'photo-1502691876148-a84978e59af8',
  'website-speed-optimization-guide': 'photo-1460925895917-afdab827c52f',
  'free-tools-for-freelancers-2026': 'photo-1522202176988-66273c2fd55f'
};

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status: ' + res.statusCode));
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function processImages() {
  console.log('Replacing random images with 100% relevant Unsplash images...\n');
  
  for (const [slug, photoId] of Object.entries(imageMap)) {
    const coverPath = path.join(targetDir, slug + '-cover.jpg');
    const innerPath = path.join(targetDir, slug + '-inner1.jpg');
    
    try {
      const baseUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`;
      
      const coverBuf = await downloadImage(baseUrl);
      await sharp(coverBuf).jpeg({ quality: 80 }).toFile(coverPath);

      const innerBuf = await downloadImage(baseUrl);
      await sharp(innerBuf).jpeg({ quality: 75 }).toFile(innerPath);
      
      console.log('✅ Fixed:', slug);
    } catch (e) {
      console.error('❌ Error for', slug, '-', e.message);
    }
  }
  console.log('\n🎉 All relevant images processed successfully!');
}
processImages();

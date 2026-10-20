const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const targetDir = './public/images/blog';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const slugs = [
  'how-to-compress-images-without-losing-quality', 'merge-pdf-files-online-complete-guide', 'json-formatter-complete-developer-guide', 'strong-password-generator-complete-guide', 'base64-encoding-explained-beginner-guide',
  'jpg-vs-png-vs-webp-which-format', 'convert-jpg-to-pdf-complete-guide', 'uuid-v4-vs-v7-when-to-use-each', 'qr-codes-business-cards-marketing', 'word-count-guide-writing-content',
  'image-sizes-social-media-2026-guide', 'pdf-to-jpg-when-and-why', 'json-vs-xml-complete-comparison', 'favicon-complete-guide-website-icons', 'url-encoding-explained-special-characters',
  'twitter-character-limit-guide-2026', 'barcode-vs-qr-code-when-to-use', 'title-case-vs-sentence-case-writing-guide', 'image-to-sketch-cartoon-how-it-works', 'image-cropping-guide-aspect-ratios',
  'how-to-reduce-pdf-file-size', 'best-free-tools-for-students-2026', 'what-is-exif-metadata-privacy-guide', 'webp-image-format-complete-guide', 'professional-cv-writing-tips-2026',
  'how-to-merge-images-into-one', 'youtube-thumbnail-design-guide', 'email-attachment-size-limits-guide', 'color-picker-guide-web-design', 'how-to-protect-online-privacy-2026',
  'how-to-convert-heic-to-jpg', 'how-to-remove-background-from-photos', 'website-speed-optimization-guide', 'free-tools-for-freelancers-2026', 'how-to-create-favicon-from-logo',
  'how-to-add-watermark-to-photos'
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status: ' + res.statusCode));
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processImages() {
  console.log('Downloading and optimizing 36 blog images...');
  for (const slug of slugs) {
    const coverPath = path.join(targetDir, slug + '-cover.jpg');
    const innerPath = path.join(targetDir, slug + '-inner1.jpg');
    
    // Skip if already exists
    if (fs.existsSync(coverPath) && fs.existsSync(innerPath)) {
      console.log('⏭️ Skipping', slug, '(already exists)');
      continue;
    }
    
    try {
      // 1. Cover Image
      const coverUrl = 'https://picsum.photos/seed/' + slug + '/1200/630';
      const coverBuf = await downloadImage(coverUrl);
      await sharp(coverBuf).jpeg({ quality: 80 }).toFile(coverPath);
      
      // 2. Inner Image
      const innerUrl = 'https://picsum.photos/seed/' + slug + '-img/800/600';
      const innerBuf = await downloadImage(innerUrl);
      await sharp(innerBuf).jpeg({ quality: 75 }).toFile(innerPath);
      
      console.log('✅ Done:', slug);
    } catch (e) {
      console.error('❌ Error for', slug, e.message);
    }
  }
  console.log('🎉 All images processed successfully!');
}
processImages();

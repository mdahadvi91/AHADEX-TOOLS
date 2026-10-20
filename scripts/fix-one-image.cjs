const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const slug = 'title-case-vs-sentence-case-writing-guide';
// Pexels থেকে একটি নিশ্চিত রাইটিং/নোটবুক ছবি
const imageUrl = 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1200'; 

const targetDir = './public/images/blog';

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
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function fixOne() {
  try {
    const buf = await downloadImage(imageUrl);
    
    await sharp(buf).jpeg({ quality: 80 }).toFile(path.join(targetDir, slug + '-cover.jpg'));
    await sharp(buf).jpeg({ quality: 75 }).toFile(path.join(targetDir, slug + '-inner1.jpg'));
    console.log('✅ Successfully fixed the missing image for:', slug);
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
}
fixOne();

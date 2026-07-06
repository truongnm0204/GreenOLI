import { getPayload } from 'payload';
import config from '@payload-config';
import fs from 'fs';
import path from 'path';

const SERVICE_MAP: Record<string, string> = {
  'diet-gian-con-trung': 'srv_gian',
  've-sinh-cong-nghiep': 'srv_vesinh'
  // Missing due to quota:
  // 'diet-muoi': 'srv_muoi',
  // 'diet-chuot': 'srv_chuot',
  // 'diet-moi-tan-goc': 'srv_moi'
};

const IMAGE_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\93d07a4b-761c-41e7-906c-22d245ed5419';

async function main() {
  const payload = await getPayload({ config });
  const { docs: services } = await payload.find({ collection: 'services', limit: 100 });
  
  for (const service of services) {
    const prefix = SERVICE_MAP[service.slug];
    if (!prefix) {
      console.log(`Bỏ qua service: ${service.slug}`);
      continue;
    }
    
    const files = fs.readdirSync(IMAGE_DIR);
    const matchedFiles = files.filter(f => f.startsWith(prefix) && f.endsWith('.png')).sort().reverse();
    
    if (matchedFiles.length === 0) {
      console.log(`Không tìm thấy ảnh cho ${prefix}`);
      continue;
    }
    
    const filePath = path.join(IMAGE_DIR, matchedFiles[0]);
    const buffer = fs.readFileSync(filePath);
    const fileName = `${prefix}.png`;
    
    console.log(`Đang upload ảnh cho ${service.slug}...`);
    
    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: service.name },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: fileName,
        size: buffer.length,
      },
    });
    
    console.log(`Đã upload media ID: ${mediaDoc.id}. Đang cập nhật service...`);
    
    await payload.update({
      collection: 'services',
      id: service.id,
      data: {
        image: mediaDoc.id
      }
    });
    
    console.log(`Đã cập nhật xong service ${service.slug}`);
  }
  
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

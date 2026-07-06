import { getPayload } from 'payload';
import config from '@payload-config';
import fs from 'fs';
import path from 'path';

const CATEGORY_MAP = {
  'thuoc-diet-muoi-ruoi-con-trung-bay': 'cat_muoi',
  'thuoc-diet-gian': 'cat_gian',
  'thuoc-diet-kien': 'cat_kien',
  'thuoc-diet-moi': 'cat_moi',
  'thuoc-diet-chuot': 'cat_chuot',
  'kiem-soat-con-trung-chuyen-dung': 'cat_chuyen_dung',
  'xua-duoi-ran-va-bo-sat': 'cat_ran',
  'dung-cu-xu-ly-con-trung': 'cat_dung_cu',
};

// Paths to the generated images in the brain folder
const IMAGE_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\93d07a4b-761c-41e7-906c-22d245ed5419';

async function main() {
  const payload = await getPayload({ config });
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 100 });
  
  for (const category of categories) {
    const prefix = CATEGORY_MAP[category.slug];
    if (!prefix) {
      console.log(`Bỏ qua category: ${category.slug}`);
      continue;
    }
    
    // Find the latest image file for this prefix
    const files = fs.readdirSync(IMAGE_DIR);
    const matchedFiles = files.filter(f => f.startsWith(prefix) && f.endsWith('.png')).sort().reverse();
    
    if (matchedFiles.length === 0) {
      console.log(`Không tìm thấy ảnh cho ${prefix}`);
      continue;
    }
    
    const filePath = path.join(IMAGE_DIR, matchedFiles[0]);
    const buffer = fs.readFileSync(filePath);
    const fileName = `${prefix}.png`;
    
    console.log(`Đang upload ảnh cho ${category.slug}...`);
    
    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: category.name },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: fileName,
        size: buffer.length,
      },
    });
    
    console.log(`Đã upload media ID: ${mediaDoc.id}. Đang cập nhật category...`);
    
    await payload.update({
      collection: 'categories',
      id: category.id,
      data: {
        heroImage: mediaDoc.id
      }
    });
    
    console.log(`Đã cập nhật xong category ${category.slug}`);
  }
  
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

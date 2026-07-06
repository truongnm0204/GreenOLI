import { getPayload } from 'payload';
import config from '@payload-config';

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: 'categories', limit: 100 });
  console.log(docs.map(d => d.slug + ': ' + d.name).join('\n'));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
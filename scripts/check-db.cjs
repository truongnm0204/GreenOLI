const { Client } = require('pg');

async function main() {
  const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_9bsiqALTVEv7@ep-long-block-aoqr9f2x.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require' });
  await client.connect();
  
  const tables = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
  
  const counts = [];
  for (const row of tables.rows) {
    const res = await client.query(`SELECT COUNT(*) FROM "${row.tablename}"`);
    counts.push({ table: row.tablename, count: parseInt(res.rows[0].count, 10) });
  }
  
  console.table(counts);
  await client.end();
}
main();

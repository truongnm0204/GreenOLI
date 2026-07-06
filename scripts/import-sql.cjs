const fs = require('fs');
const { Client } = require('pg');

async function main() {
  const connectionString = 'postgresql://neondb_owner:npg_9bsiqALTVEv7@ep-long-block-aoqr9f2x.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
  console.log('Connecting to database...');
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected successfully.');
    
    console.log('Reading oliDB.sql...');
    const sql = fs.readFileSync('oliDB.sql', 'utf8');
    
    console.log('Executing SQL...');
    await client.query(sql);
    
    console.log('SQL executed successfully!');
  } catch (err) {
    console.error('Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

main();

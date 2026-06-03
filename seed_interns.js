// Run once: node seed_interns.js
// Creates 5 intern accounts in Supabase Auth

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const INTERNS = [
  { id: 'INTERN01', password: '12345678' },
  { id: 'INTERN02', password: '12345678' },
  { id: 'INTERN03', password: '12345678' },
  { id: 'INTERN04', password: '12345678' },
  { id: 'INTERN05', password: '12345678' },
];

async function seed() {
  for (const intern of INTERNS) {
    const email = `${intern.id.toLowerCase()}@nutriintern.app`;
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: intern.password,
      email_confirm: true,
      user_metadata: { name: intern.id }
    });
    if (error) {
      console.log(`❌ ${intern.id}: ${error.message}`);
    } else {
      console.log(`✅ ${intern.id} created (${email})`);
    }
  }
  console.log('\nAll done! Password for all: 12345678');
}

seed();

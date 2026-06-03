// Run once: node seed_admin.js
// Creates admin001 account and sets role = 'admin' in profiles

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function seedAdmin() {
  const email = 'admin001@nutriintern.app';
  const password = '12345678';

  // Create auth user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: 'ADMIN001' }
  });

  if (error) {
    console.log(`❌ Failed to create admin: ${error.message}`);
    return;
  }

  console.log(`✅ ADMIN001 created (${email})`);

  // Set role to admin in profiles table
  const { error: roleError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', data.user.id);

  if (roleError) {
    console.log(`❌ Failed to set admin role: ${roleError.message}`);
  } else {
    console.log(`✅ Role set to admin`);
  }

  console.log('\nAdmin credentials:');
  console.log('  Login ID : ADMIN001');
  console.log('  Password : 12345678');
}

seedAdmin();

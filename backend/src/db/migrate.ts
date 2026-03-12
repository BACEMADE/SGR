import { query } from "./pool";

export async function runMigrations() {
  console.log("Running database migrations...");

  await query(`
    DO $$ BEGIN
      CREATE TYPE app_role AS ENUM ('creator', 'partner');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS user_roles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role app_role NOT NULL,
      UNIQUE(user_id, role)
    );

    CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      email VARCHAR(255) NOT NULL DEFAULT '',
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      phone VARCHAR(50) DEFAULT '',
      city VARCHAR(100) DEFAULT '',
      avatar_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash VARCHAR(255) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      revoked BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON refresh_tokens(token_hash);
  `);

  console.log("Migrations completed.");
}

// Run standalone
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}

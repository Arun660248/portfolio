import { createClient, Client } from "@libsql/client";

let dbInstance: Client | null = null;

export function getDb(): Client {
  if (!dbInstance) {
    const isProduction = process.env.NODE_ENV === "production";
    const dbUrl = process.env.TURSO_DATABASE_URL || (isProduction ? "file:/tmp/arun_sys.db" : "file:./data/arun_sys.db");

    dbInstance = createClient({
      url: dbUrl,
    });
  }
  return dbInstance;
}

export async function initDb(): Promise<void> {
  const db = getDb();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id TEXT PRIMARY KEY,
      entity TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      target_route TEXT NOT NULL,
      claim_metric TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS audit_sessions (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      user_query TEXT NOT NULL,
      agent_response TEXT NOT NULL,
      citations_json TEXT NOT NULL,
      eval_score REAL NOT NULL,
      latency_ms INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
}

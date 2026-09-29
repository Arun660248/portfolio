import { getDb, initDb } from "./client";
import { KnowledgeFact, seedKnowledgeBase } from "./seed";

export interface AuditSessionRecord {
  id: string;
  sessionId: string;
  userQuery: string;
  agentResponse: string;
  citationsJson: string;
  evalScore: number;
  latencyMs: number;
  createdAt: string;
}

export async function searchKnowledgeBase(query: string, pathname?: string): Promise<KnowledgeFact[]> {
  await seedKnowledgeBase();
  const db = getDb();

  const q = query.toLowerCase().trim();
  const keywords = q.split(/\s+/).filter((w) => w.length > 2);
  const path = (pathname || "").toLowerCase().trim();

  const res = await db.execute("SELECT * FROM knowledge_base");
  const allFacts = res.rows.map((r) => ({
    id: String(r.id),
    entity: String(r.entity),
    category: String(r.category),
    content: String(r.content),
    targetRoute: String(r.target_route),
    claimMetric: String(r.claim_metric),
  }));

  // Score facts by keyword relevance and active pathname
  const scored = allFacts.map((fact) => {
    let score = 0;
    const text = (fact.entity + " " + fact.content + " " + fact.category).toLowerCase();
    const factRoute = fact.targetRoute.toLowerCase();

    // Direct page route boost (e.g. /systems/healthcare-appointment-assistant)
    if (path && factRoute && (path === factRoute || path.includes(factRoute) || factRoute.includes(path))) {
      score += 25;
    }

    for (const kw of keywords) {
      if (text.includes(kw)) score += 2;
    }
    // High-priority direct matching
    if (q.includes("trading") && fact.id === "fact-trading") score += 5;
    if (q.includes("rag") && fact.id === "fact-rag") score += 5;
    if (q.includes("financial") && fact.id === "fact-finai") score += 5;
    if ((q.includes("load") || q.includes("balance")) && fact.id === "fact-loadbalancer") score += 5;
    if (q.includes("health") && fact.id === "fact-healthcare") score += 5;
    if ((q.includes("harness") || q.includes("langgraph")) && fact.id === "fact-harness") score += 5;
    if ((q.includes("iit") || q.includes("course") || q.includes("study")) && fact.id === "fact-iitg") score += 5;
    if ((q.includes("fail") || q.includes("bug") || q.includes("post-mortem")) && fact.id === "fact-failures") score += 5;
    if ((q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("whatsapp")) && fact.id === "fact-contact") score += 5;

    return { fact, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).slice(0, 3).map((s) => s.fact);
}

export async function saveAuditTurn(
  sessionId: string,
  userQuery: string,
  agentResponse: string,
  citations: unknown[],
  evalScore: number,
  latencyMs: number
): Promise<void> {
  await initDb();
  const db = getDb();
  const id = "turn-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);

  await db.execute({
    sql: `INSERT INTO audit_sessions (id, session_id, user_query, agent_response, citations_json, eval_score, latency_ms, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      sessionId,
      userQuery,
      agentResponse,
      JSON.stringify(citations),
      evalScore,
      latencyMs,
      new Date().toISOString(),
    ],
  });
}

export async function getAuditHistory(sessionId: string): Promise<{ query: string; answer: string }[]> {
  await initDb();
  const db = getDb();
  try {
    const res = await db.execute({
      sql: "SELECT user_query, agent_response FROM audit_sessions WHERE session_id = ? ORDER BY created_at ASC LIMIT 6",
      args: [sessionId],
    });

    return res.rows.map((r) => ({
      query: String(r.user_query),
      answer: String(r.agent_response),
    }));
  } catch {
    return [];
  }
}

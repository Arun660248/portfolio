import { NextResponse } from "next/server";
import { agentGraph } from "@/lib/agent/graph";
import { seedKnowledgeBase } from "@/lib/db/seed";

export async function POST(req: Request) {
  try {
    await seedKnowledgeBase();
    const body = await req.json();
    const query = String(body.query || "").trim();
    const sessionId = String(body.sessionId || "session-default-" + Date.now());

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const startTotal = Date.now();
    const stateResult = await agentGraph.invoke({
      sessionId,
      query,
      history: [],
      retrievedFacts: [],
      guardrailViolation: null,
      rawResponse: "",
      finalAnswer: "",
      citations: [],
      evalScore: 1.0,
      trace: [],
      apiKey: body.apiKey ? String(body.apiKey).trim() : undefined,
      pathname: body.pathname ? String(body.pathname).trim() : undefined,
    });
    const totalDurationMs = Date.now() - startTotal;

    return NextResponse.json({
      sessionId,
      answer: stateResult.finalAnswer,
      citations: stateResult.citations,
      evalScore: stateResult.evalScore,
      guardrailViolation: stateResult.guardrailViolation,
      trace: stateResult.trace,
      totalDurationMs,
    });
  } catch (error) {
    console.error("Agent execution failed:", error);
    return NextResponse.json(
      {
        error: "Agent state graph execution error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

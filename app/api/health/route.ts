import { NextResponse } from "next/server";

// Liveness check for the hosting platform (Render's healthCheckPath) — no
// dependencies to verify (this app has no database), so a 200 response
// means the Node process is up and serving requests.
export function GET() {
  return NextResponse.json({ status: "ok" });
}

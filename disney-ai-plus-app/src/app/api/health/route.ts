// src/app/api/health/route.ts
import { NextResponse } from "next/server";

/**
 * Health check endpoint for the Disney AI Plus application
 * Returns basic system status and timestamp
 */
export async function GET() {
  const healthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "disney-ai-plus-app",
    version: "0.1.0",
    environment: process.env.NODE_ENV || "development",
  };

  return NextResponse.json(healthStatus, { status: 200 });
}

// src/app/api/catalog/route.ts
// Catalog Component - Handles catalog operations for video content management
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 }
      );
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Build query
    let query = supabase
      .from("videos")
      .select("*")
      .order("uploaded_at", { ascending: false });

    // Apply region filter if provided
    if (region) {
      query = query.or(`region.eq.${region},region.is.null`);
    }

    // Apply pagination
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    if (offset) {
      query = query.range(
        parseInt(offset, 10),
        parseInt(offset, 10) + (limit ? parseInt(limit, 10) : 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Catalog API] Error fetching videos:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        count: data?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Catalog API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { title, description, thumbnail_url, video_url, region, duration, file_size } = body;

    // Validate required fields
    if (!title || !thumbnail_url || !video_url) {
      return NextResponse.json(
        {
          error: "Validation error",
          message: "title, thumbnail_url, and video_url are required",
        },
        { status: 400 }
      );
    }

    // Insert new video
    const { data, error } = await supabase
      .from("videos")
      .insert([
        {
          title,
          description,
          thumbnail_url,
          video_url,
          region,
          duration,
          file_size,
          uploader_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[Catalog API] Error creating video:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Video created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Catalog API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: String(error) },
      { status: 500 }
    );
  }
}

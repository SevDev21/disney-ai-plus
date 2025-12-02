// src/app/api/catalog/[id]/route.ts
// Catalog Component - Individual video operations (GET, UPDATE, DELETE)
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

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

    // Fetch video by ID
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Not found", message: "Video not found" },
          { status: 404 }
        );
      }
      console.error("[Catalog API] Error fetching video:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
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

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

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

    // Get user profile to check if admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Parse request body
    const body = await req.json();
    const { title, description, thumbnail_url, video_url, region, duration, file_size } = body;

    // Build update object with only provided fields
    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (thumbnail_url !== undefined) updates.thumbnail_url = thumbnail_url;
    if (video_url !== undefined) updates.video_url = video_url;
    if (region !== undefined) updates.region = region;
    if (duration !== undefined) updates.duration = duration;
    if (file_size !== undefined) updates.file_size = file_size;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Validation error", message: "No fields to update" },
        { status: 400 }
      );
    }

    // First check if the video exists and get uploader_id
    const { data: existingVideo, error: fetchError } = await supabase
      .from("videos")
      .select("uploader_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingVideo) {
      return NextResponse.json(
        { error: "Not found", message: "Video not found" },
        { status: 404 }
      );
    }

    // Check if user is owner or admin
    const isOwner = existingVideo.uploader_id === user.id;
    const isAdmin = profile?.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "You can only update your own videos",
        },
        { status: 403 }
      );
    }

    // Update video
    const { data, error } = await supabase
      .from("videos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Catalog API] Error updating video:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Video updated successfully",
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

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const { id } = await context.params;

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

    // Get user profile to check if admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // First check if the video exists and get uploader_id
    const { data: existingVideo, error: fetchError } = await supabase
      .from("videos")
      .select("uploader_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingVideo) {
      return NextResponse.json(
        { error: "Not found", message: "Video not found" },
        { status: 404 }
      );
    }

    // Check if user is owner or admin
    const isOwner = existingVideo.uploader_id === user.id;
    const isAdmin = profile?.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "You can only delete your own videos",
        },
        { status: 403 }
      );
    }

    // Delete video
    const { error } = await supabase.from("videos").delete().eq("id", id);

    if (error) {
      console.error("[Catalog API] Error deleting video:", error);
      return NextResponse.json(
        { error: "Database error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Video deleted successfully",
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

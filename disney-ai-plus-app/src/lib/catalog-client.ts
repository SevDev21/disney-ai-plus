// src/lib/catalog-client.ts
// Client-side utilities for interacting with the Catalog API Component

import type {
  CreateVideoInput,
  UpdateVideoInput,
  CatalogListResponse,
  CatalogItemResponse,
  CatalogDeleteResponse,
  CatalogErrorResponse,
} from "@/types/catalog";

type CatalogListOptions = {
  region?: string;
  limit?: number;
  offset?: number;
};

/**
 * Fetch all videos from the catalog
 * Supports optional filtering by region and pagination
 */
export async function getCatalogVideos(
  options: CatalogListOptions = {}
): Promise<CatalogListResponse | CatalogErrorResponse> {
  try {
    const params = new URLSearchParams();
    if (options.region) params.append("region", options.region);
    if (options.limit) params.append("limit", String(options.limit));
    if (options.offset) params.append("offset", String(options.offset));

    const url = `/api/catalog${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to fetch videos",
    };
  }
}

/**
 * Fetch a single video by ID
 */
export async function getCatalogVideo(
  id: string
): Promise<CatalogItemResponse | CatalogErrorResponse> {
  try {
    const response = await fetch(`/api/catalog/${id}`);
    return await response.json();
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to fetch video",
    };
  }
}

/**
 * Create a new video in the catalog
 */
export async function createCatalogVideo(
  input: CreateVideoInput
): Promise<CatalogItemResponse | CatalogErrorResponse> {
  try {
    const response = await fetch("/api/catalog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    return await response.json();
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to create video",
    };
  }
}

/**
 * Update an existing video in the catalog
 */
export async function updateCatalogVideo(
  id: string,
  input: UpdateVideoInput
): Promise<CatalogItemResponse | CatalogErrorResponse> {
  try {
    const response = await fetch(`/api/catalog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    return await response.json();
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to update video",
    };
  }
}

/**
 * Delete a video from the catalog
 */
export async function deleteCatalogVideo(
  id: string
): Promise<CatalogDeleteResponse | CatalogErrorResponse> {
  try {
    const response = await fetch(`/api/catalog/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to delete video",
    };
  }
}

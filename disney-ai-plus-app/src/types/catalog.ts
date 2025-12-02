// src/types/catalog.ts
// Type definitions for the Catalog Component

export type Video = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string;
  video_url: string;
  region: string | null;
  uploaded_at: string;
  uploader_id: string | null;
  duration: number | null;
  file_size: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreateVideoInput = {
  title: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  region?: string;
  duration?: number;
  file_size?: number;
};

export type UpdateVideoInput = {
  title?: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  region?: string;
  duration?: number;
  file_size?: number;
};

export type CatalogListResponse = {
  success: true;
  data: Video[];
  count: number;
};

export type CatalogItemResponse = {
  success: true;
  data: Video;
  message?: string;
};

export type CatalogErrorResponse = {
  error: string;
  message: string;
};

export type CatalogDeleteResponse = {
  success: true;
  message: string;
};

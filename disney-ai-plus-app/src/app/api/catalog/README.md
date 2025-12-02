# Catalog API Component

The Catalog Component provides a RESTful API for managing video content within the Disney AI Plus platform. It implements full CRUD (Create, Read, Update, Delete) operations with authentication, authorization, and region-based content filtering.

## Architecture

This component is part of the API container as defined in the C4 Component diagram. It integrates with:

- **Auth Component**: Validates user authentication and role-based permissions
- **Database Container**: Supabase PostgreSQL for data persistence
- **Web App Container**: Provides data to the frontend components

## API Endpoints

### List Videos

**GET** `/api/catalog`

Retrieves a list of videos from the catalog with optional filtering and pagination.

**Query Parameters:**
- `region` (optional): Filter videos by region (also includes region-neutral content)
- `limit` (optional): Maximum number of videos to return
- `offset` (optional): Number of videos to skip for pagination

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Video Title",
      "description": "Video description",
      "thumbnail_url": "https://...",
      "video_url": "https://...",
      "region": "US",
      "uploaded_at": "2025-01-01T00:00:00Z",
      "uploader_id": "uuid",
      "duration": 180,
      "file_size": 45000000,
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

### Get Single Video

**GET** `/api/catalog/[id]`

Retrieves a specific video by ID.

**Path Parameters:**
- `id`: UUID of the video

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Video Title",
    ...
  }
}
```

### Create Video

**POST** `/api/catalog`

Creates a new video entry in the catalog.

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Video Title",
  "description": "Optional description",
  "thumbnail_url": "https://...",
  "video_url": "https://...",
  "region": "US",
  "duration": 180,
  "file_size": 45000000
}
```

**Required Fields:**
- `title`
- `thumbnail_url`
- `video_url`

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Video created successfully"
}
```

### Update Video

**PATCH** `/api/catalog/[id]`

Updates an existing video. Users can only update their own videos unless they have admin role.

**Path Parameters:**
- `id`: UUID of the video

**Authentication:** Required

**Authorization:** Owner or Admin

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Video updated successfully"
}
```

### Delete Video

**DELETE** `/api/catalog/[id]`

Deletes a video from the catalog. Users can only delete their own videos unless they have admin role.

**Path Parameters:**
- `id`: UUID of the video

**Authentication:** Required

**Authorization:** Owner or Admin

**Response:**
```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

**401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "You can only update your own videos"
}
```

**404 Not Found:**
```json
{
  "error": "Not found",
  "message": "Video not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "Error details"
}
```

## Client Usage

Use the provided client-side utilities for type-safe API interactions:

```typescript
import {
  getCatalogVideos,
  getCatalogVideo,
  createCatalogVideo,
  updateCatalogVideo,
  deleteCatalogVideo,
} from "@/lib/catalog-client";

// List videos
const result = await getCatalogVideos({ region: "US", limit: 10 });

// Get single video
const video = await getCatalogVideo("video-id");

// Create video
const newVideo = await createCatalogVideo({
  title: "My Video",
  thumbnail_url: "https://...",
  video_url: "https://...",
});

// Update video
const updated = await updateCatalogVideo("video-id", {
  title: "Updated Title",
});

// Delete video
const deleted = await deleteCatalogVideo("video-id");
```

## Security

- **Authentication**: All endpoints require valid Supabase authentication
- **Authorization**: Update and delete operations enforce ownership or admin role
- **Row Level Security**: Database policies provide additional security layer
- **Input Validation**: Required fields are validated before processing

## Database Schema

The Catalog API operates on the `videos` table with the following structure:

```sql
videos (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  region TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploader_id UUID REFERENCES auth.users(id),
  duration INTEGER,
  file_size BIGINT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

## Integration with Existing Components

The Catalog API integrates seamlessly with existing frontend components:

- `src/components/admin/MediaView.tsx` - Admin can use this API for management
- `src/components/user/UserMediaView.tsx` - Users can fetch region-filtered content
- `src/components/AdminView.tsx` - Admin dashboard integration
- `src/components/UserView.tsx` - User dashboard integration

## Testing

Test the API endpoints using:

```bash
# Run type checking
pnpm exec tsc --noEmit

# Run linter
pnpm lint

# Run Playwright tests (if available)
pnpm exec playwright test
```

## Implementation Notes

- Follows Next.js 16 App Router conventions
- Uses async/await pattern for Supabase client (Next.js 16 requirement)
- Implements proper error handling and logging
- Supports region-based content filtering for multi-region deployment
- TypeScript strict mode compliant
- Follows existing codebase patterns and architecture

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.thumbnail_url || !body.video_url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, thumbnail_url, and video_url are required' },
        { status: 400 }
      )
    }

    // Insert into videos table
    const { data, error } = await supabase
      .from('videos')
      .insert({
        title: body.title,
        description: body.description || null,
        thumbnail_url: body.thumbnail_url,
        video_url: body.video_url,
        duration: body.duration || null,
        file_size: body.file_size || null,
        region: body.region || null,
        uploader_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating media:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

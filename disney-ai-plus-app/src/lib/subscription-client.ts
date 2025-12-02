// src/lib/subscription-client.ts
// Client-side utilities for interacting with User and Subscription domain models

import type {
  User,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  SubscriptionListResponse,
  SubscriptionItemResponse,
  SubscriptionDeleteResponse,
  SubscriptionErrorResponse,
  UserWithSubscriptions,
} from "@/types/subscription";
import { createClient } from "@/lib/supabase/client";

type SubscriptionListOptions = {
  userId?: string;
  status?: string;
  limit?: number;
  offset?: number;
};

/**
 * USER OPERATIONS
 */

/**
 * Get a user by ID
 * Uses the auth.users table which already exists in Supabase
 */
export async function getUser(
  userId: string
): Promise<User | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("Error fetching user:", error);
    return null;
  }

  return {
    id: data.id,
    email: data.email,
  };
}

/**
 * Get a user with all their subscriptions (demonstrates 1-to-many relationship)
 */
export async function getUserWithSubscriptions(
  userId: string
): Promise<UserWithSubscriptions | null> {
  const supabase = createClient();

  // Fetch user
  const user = await getUser(userId);
  if (!user) return null;

  // Fetch user's subscriptions
  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subscriptions:", error);
    return {
      ...user,
      subscriptions: [],
    };
  }

  return {
    ...user,
    subscriptions: subscriptions || [],
  };
}

/**
 * SUBSCRIPTION OPERATIONS
 */

/**
 * Fetch all subscriptions with optional filtering
 * Supports filtering by user ID, status, and pagination
 */
export async function getSubscriptions(
  options: SubscriptionListOptions = {}
): Promise<SubscriptionListResponse | SubscriptionErrorResponse> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("subscriptions")
      .select("*", { count: "exact" });

    // Apply filters
    if (options.userId) {
      query = query.eq("user_id", options.userId);
    }
    if (options.status) {
      query = query.eq("status", options.status);
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, (options.offset || 0) + (options.limit || 10) - 1);
    }

    // Order by created_at descending
    query = query.order("created_at", { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return {
        error: "Database error",
        message: error.message,
      };
    }

    return {
      success: true,
      data: data || [],
      count: count || 0,
    };
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to fetch subscriptions",
    };
  }
}

/**
 * Fetch a single subscription by ID
 */
export async function getSubscription(
  id: string
): Promise<SubscriptionItemResponse | SubscriptionErrorResponse> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return {
        error: "Database error",
        message: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to fetch subscription",
    };
  }
}

/**
 * Create a new subscription
 */
export async function createSubscription(
  input: CreateSubscriptionInput
): Promise<SubscriptionItemResponse | SubscriptionErrorResponse> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([input])
      .select()
      .single();

    if (error) {
      return {
        error: "Database error",
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: "Subscription created successfully",
    };
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to create subscription",
    };
  }
}

/**
 * Update an existing subscription
 */
export async function updateSubscription(
  id: string,
  input: UpdateSubscriptionInput
): Promise<SubscriptionItemResponse | SubscriptionErrorResponse> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("subscriptions")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return {
        error: "Database error",
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: "Subscription updated successfully",
    };
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to update subscription",
    };
  }
}

/**
 * Delete a subscription
 */
export async function deleteSubscription(
  id: string
): Promise<SubscriptionDeleteResponse | SubscriptionErrorResponse> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", id);

    if (error) {
      return {
        error: "Database error",
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Subscription deleted successfully",
    };
  } catch (error) {
    return {
      error: "Network error",
      message: error instanceof Error ? error.message : "Failed to delete subscription",
    };
  }
}

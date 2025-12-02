// src/types/subscription.ts
// Type definitions for User and Subscription domain models

/**
 * User Domain Model
 * Represents a user in the system with subscription management capabilities
 */
export type User = {
  id: string;
  email: string;
};

/**
 * Subscription Domain Model
 * Represents a subscription associated with a user
 */
export type Subscription = {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

/**
 * Input type for creating a new subscription
 */
export type CreateSubscriptionInput = {
  user_id: string;
  status: string;
};

/**
 * Input type for updating an existing subscription
 */
export type UpdateSubscriptionInput = {
  status?: string;
};

/**
 * Response type for listing subscriptions
 */
export type SubscriptionListResponse = {
  success: true;
  data: Subscription[];
  count: number;
};

/**
 * Response type for a single subscription operation
 */
export type SubscriptionItemResponse = {
  success: true;
  data: Subscription;
  message?: string;
};

/**
 * Response type for subscription errors
 */
export type SubscriptionErrorResponse = {
  error: string;
  message: string;
};

/**
 * Response type for subscription deletion
 */
export type SubscriptionDeleteResponse = {
  success: true;
  message: string;
};

/**
 * User with their associated subscriptions (1-to-many relationship)
 */
export type UserWithSubscriptions = User & {
  subscriptions: Subscription[];
};

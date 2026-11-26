import type { CreditCosts } from "@/lib/models/creator";

/**
 * Mirrors `COSTS`, `SIGNUP_CREDITS`, `SIGNUP_CREDIT_DAYS` and `FILTER_UNLOCK_HOURS` in the backend
 * (appsync/handlers/creators/helper/credits.js). The backend is the source of truth; keep these in sync.
 */
export const CREDIT_COSTS: CreditCosts = { advancedFilter: 2, revealEmail: 1, revealPhone: 2, openProfile: 1 };
export const SIGNUP_CREDITS = 30;
export const SIGNUP_CREDIT_DAYS = 30;
export const FILTER_UNLOCK_HOURS = 24;

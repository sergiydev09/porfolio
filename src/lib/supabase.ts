import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import type { Database } from './types/database';

// These will be set at runtime from environment variables
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export function createSupabaseClient(fetch?: typeof globalThis.fetch) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not configured. Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in .env');
    return null;
  }

  if (isBrowser()) {
    return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { fetch }
    });
  }

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { fetch },
    cookies: {
      getAll: () => [],
      setAll: () => {}
    }
  });
}

export type SupabaseClient = ReturnType<typeof createSupabaseClient>;

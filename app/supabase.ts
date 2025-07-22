import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lrcjmzkiylrxhzqopzaz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyY2ptemtpeWxyeGh6cW9wemF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDA1ODgsImV4cCI6MjA2ODY3NjU4OH0.RqzIQRaR7CAZxHZLsCP-ARf9mKAFNwS-U0Y4Qt7FEGY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  }
}) 
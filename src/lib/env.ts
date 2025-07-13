// Environment variables validation
export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hrqtjjkphryxrgkzhufk.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycXRqamtwaHJ5eHJna3podWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MzA3NDMsImV4cCI6MjA2ODAwNjc0M30.uMaSzLSwM2yuniK5sr3SXDYgoAGyvgPas5CK-ajEvxg'
};

// Validate required environment variables
if (!env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

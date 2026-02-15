const SUPABASE_URL = "https://cbhfydsjuawdcgrzxzzu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGZ5ZHNqdWF3ZGNncnp4enp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMzMxMzcsImV4cCI6MjA4NjcwOTEzN30.15OoxHWvq_6dUYeKpBEPM5HsN8tNmYH6LtcXH3gNxRM";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

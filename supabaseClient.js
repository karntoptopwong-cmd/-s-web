const SUPABASE_URL = "https://cbhfydsjuawdcgrzxzzu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nM-AoZn8-WSz2FQQX0zbHQ_pvcKOKAJ";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

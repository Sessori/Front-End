import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ydygvukqqwnmsylvmigi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeWd2dWtxcXdubXN5bHZtaWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzOTk1MjAsImV4cCI6MjA1NDk3NTUyMH0.OD-psiGmbEPG5cmIzhY01zkFEx0d2OyiOY0YflHIjTo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

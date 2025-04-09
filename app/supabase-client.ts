import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL_X = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY_X = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL_X || !SUPABASE_ANON_KEY_X) {
  throw new Error("Missing Supabase environment Variables");
}

console.log("SUPABASE_URL_X:", SUPABASE_URL_X);
console.log("SUPABASE_ANON_KEY_X:", SUPABASE_ANON_KEY_X);

export const supabase = createClient(SUPABASE_URL_X!, SUPABASE_ANON_KEY_X!);

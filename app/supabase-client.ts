require("dotnev").config();

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL_X = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY_X = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL_X!, SUPABASE_ANON_KEY_X!);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_PUBLISHABLE_KEY;

console.log("URL:", supabaseUrl);
console.log("KEY:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);

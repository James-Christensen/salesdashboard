import { createClient } from "@supabase/supabase-js";

//create a variable for the supabaseURL and supabaseKey from the enviroment variables named SUPABASE_URL and SUPABASE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//asiign SupaBaseURL and SupaBaseKey to SupaBase client
const supabase = createClient(supabaseUrl, supabaseKey);

//export client for connecting to SupaBase DB. Function takes in url and key as paramaters.
export default supabase;

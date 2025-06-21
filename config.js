require("dotenv").config();

module.exports = {
  supabase: {
    url: process.env.SUPABASE_URL || "your_supabase_project_url",
    anonKey: process.env.SUPABASE_ANON_KEY || "your_supabase_anon_key",
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
};

import { supabase } from "@/lib/supabase";

export async function searchDocuments(
  embedding: number[],
  matchCount = 3
) {
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_count: matchCount,
  });

  if (error) {
    console.error("Vector search error:", error);
    return [];
  }

  return data || [];
}
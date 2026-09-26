import { createEmbedding } from "@/lib/embeddings";
import { searchDocuments } from "@/lib/vectorstore";

export async function getDocumentContext(query: string) {
  const embedding = await createEmbedding(query);

  const results = await searchDocuments(embedding, 3);

  return results
    .map((item: any) => item.content)
    .join("\n\n");
}
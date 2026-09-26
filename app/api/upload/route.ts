import { supabase } from "@/lib/supabase";
import { getPath } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { createEmbedding } from "@/lib/embeddings";

PDFParse.setWorker(getPath());

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        { error: "No PDF file was uploaded." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { error: "Please upload a PDF file." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();
    const embedding = await createEmbedding(result.text);

    const { error } = await supabase
      .from("documents")
      .insert({
        content: result.text,
        embedding: embedding,
      });

    if (error) {
      console.error("Supabase error:", error);

      return Response.json(
        { error: "Could not save PDF text to Supabase." },
        { status: 500 }
      );
    }

    return Response.json({
      message: "PDF uploaded and saved to Supabase successfully!",
    });
  } catch (error) {
    console.error("PDF processing error:", error);

    return Response.json(
      { error: "Could not process the PDF." },
      { status: 500 }
    );
  }
}
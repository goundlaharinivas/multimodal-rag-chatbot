import { getDocumentContext } from "@/lib/rag";
import { calculator } from "@/lib/tools";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const userMessage = formData.get("message")?.toString() || "";
    if (/^[0-9+\-*/().%\s]+$/.test(userMessage)) {
  const result = calculator(userMessage);

  return Response.json({
    message: `The answer is ${result}`,
  });
}
    const image = formData.get("image") as File | null;
    const documentContext = await getDocumentContext(userMessage);

    if (!userMessage && !image) {
      return Response.json(
        { error: "Please enter a message or select an image." },
        { status: 400 }
      );
    }

    let userContent: any;

    if (image) {
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");

      userContent = [
        {
          type: "text",
          text:
            userMessage ||
            "Please describe and analyze this image.",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${image.type};base64,${base64}`,
          },
        },
      ];
    } else {
      userContent = userMessage;
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [
            {
              role: "system",
              content: `You are SmartDoc AI, a helpful and friendly multimodal AI assistant.

Use the following document information when answering the user's question:

${documentContext}

If the answer is available in the document, answer using the document information. If it is not available, clearly say that the information was not found in the uploaded document.`,
            },
            {
              role: "user",
              content: userContent,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "Groq API request failed.",
        },
        { status: response.status }
      );
    }

    const answer =
      data?.choices?.[0]?.message?.content ||
      "I could not generate a response.";

    return Response.json({ message: answer });
  } catch (error) {
    console.error("Server error:", error);

    return Response.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
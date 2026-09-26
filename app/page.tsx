"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() && !image) return;

    setLoading(true);
    setReply("");

    try {
      // Upload PDF first
      if (image && image.type === "application/pdf") {
        const uploadData = new FormData();
        uploadData.append("file", image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          setReply(uploadResult.error || "PDF upload failed.");
          setLoading(false);
          return;
        }
      }

      // Send question to AI
      const formData = new FormData();
      formData.append("message", message);

      // Send image only if it is actually an image
      if (image && image.type !== "application/pdf") {
        formData.append("image", image);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setReply(data.error || "Something went wrong.");
      } else {
        setReply(data.message);
      }
    } catch (error) {
      console.error(error);
      setReply("Unable to connect to the AI server.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#111827",
            color: "white",
            padding: "28px",
            borderRadius: "18px 18px 0 0",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            🤖 SmartDoc AI
          </h1>

          <p
            style={{
              marginBottom: 0,
              opacity: 0.8,
            }}
          >
            Multimodal RAG Assistant
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "0 0 18px 18px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              color: "#555",
              marginTop: 0,
            }}
          >
            Ask questions about your documents, analyze images, or perform
            calculations.
          </p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask SmartDoc AI something..."
            rows={5}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              boxSizing: "border-box",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
            }}
          />

          <div
            style={{
              marginTop: "18px",
              padding: "15px",
              border: "1px dashed #9ca3af",
              borderRadius: "12px",
              background: "#f9fafb",
            }}
          >
            <label
              style={{
                fontWeight: "bold",
              }}
            >
              📎 Upload PDF or Image
            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
              }}
              style={{
                display: "block",
                marginTop: "10px",
              }}
            />

            {image && (
              <p
                style={{
                  marginBottom: 0,
                  color: "#374151",
                }}
              >
                Selected: <strong>{image.name}</strong>
              </p>
            )}
          </div>

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Processing..." : "Send Message"}
          </button>

          {reply && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#f3f4f6",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            >
              <strong>🤖 SmartDoc AI</strong>

              <p
                style={{
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  marginBottom: 0,
                }}
              >
                {reply}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
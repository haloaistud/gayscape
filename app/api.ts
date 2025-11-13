"use client";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: "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" });

export const fetchPosts = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are generating short social media posts for a feed." },
        { role: "user", content: "Generate 5 short posts with a title and content in JSON format." }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = response.choices[0].message?.content || "";
    return JSON.parse(text);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [{ id: "1", title: "Error", content: "Failed to fetch AI posts." }];
  }
};

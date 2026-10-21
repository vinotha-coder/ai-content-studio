const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/api/generate-blog", async (req, res) => {

    try {

        const {
            topic,
            audience,
            tone,
            language,
            length,
            keywords
        } = req.body;

        if (!topic) {
            return res.status(400).json({
                error: "Topic is required"
            });
        }

        const prompt = `
You are a professional content writer.

Create a high-quality blog post about:

Topic: ${topic}

Target Audience: ${audience}
Tone: ${tone}
Language: ${language}
Length: ${length}
SEO Keywords: ${keywords || "Use relevant keywords"}

Requirements:

1. Create an attractive title.
2. Write a useful introduction.
3. Use clear headings and subheadings.
4. Provide practical and accurate information.
5. Include examples where useful.
6. Add a conclusion.
7. Add 5 frequently asked questions.
8. Suggest 5 related topics.
9. Suggest 5 useful external resource types
   relevant to the topic.
10. Do not mention Wikipedia.
11. Do not invent specific URLs.
12. Return clean HTML suitable for displaying
    inside a website.
`;

        const completion =
            await groq.chat.completions.create({

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                model: "openai/gpt-oss-120b",

                temperature: 0.7,

                max_tokens: 5000

            });


        const content =
            completion.choices[0]
                .message.content;


        res.json({
            success: true,
            content: content
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: "AI generation failed"
        });

    }

});


app.listen(5000, () => {

    console.log(
        "AI Content Studio server running on http://localhost:5000"
    );

});
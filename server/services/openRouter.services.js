export const askAi = async (messages) => {
    try {
        // Validate input
        if (!messages || messages.length === 0) {
            throw new Error("Message Array is empty.");
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPEN_ROUTER}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: messages,
            }),
        });

        // Convert response to JSON
        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            console.log("OpenRouter Error:", data);
            throw new Error("OpenRouter API Error");
        }

        const content = data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }

        return content;

    } catch (error) {
        console.log("Open Router Error:", error.message);
        throw error;
    }
};
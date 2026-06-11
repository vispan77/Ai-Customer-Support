import axios from "axios";

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "openai/gpt-oss-120b:free"

const generateResponse = async (prompt: string) => {
    try {
        if (!prompt || prompt.length === 0) {
            throw new Error("Please provide prompt")
        }

        const response = await axios.post(
            openRouterUrl,
            {
                model: model,
                messages: [
                    {
                        role: "system",
                        content: "You must return ONLY valid raw JSON"
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"

                }
            }

        )
        
        const content = response?.data?.choices[0].message?.content;

        return content;

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while generating response form the open router")
    }

}

export default generateResponse;
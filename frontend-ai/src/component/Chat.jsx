import { useState } from "react";

const Chat = () => {

    const [query, setQuery] = useState("");

    const [messages, setMessages] = useState([]);

    const handleSubmit = async () => {

        if (!query.trim()) return;

        const userMessage = {
            role: "user",
            content: query,
        };

        setMessages((prev) => [...prev, userMessage]);

        setQuery("");

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query,
                }),
            }
        );
        console.log(response)

        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        let aiResponse = "";

        setMessages((prev) => [
            ...prev,
            {
                role: "ai",
                content: "",
            },
        ]);

        while (true) {

            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value);

            aiResponse += chunk;

            setMessages((prev) => {

                const updated = [...prev];

                updated[updated.length - 1] = {
                    role: "ai",
                    content: aiResponse,
                };

                return updated;
            });
        }
    };
    return (
        <div className="h-full flex flex-col p-1">

            {/* Messages */}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-6">

                {
                    messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.role === "user"
                                    ? "flex justify-end"
                                    : "flex justify-start"
                            }
                        >

                            <div
                                className={
                                    msg.role === "user"
                                        ? "bg-white text-black px-5 py-4 rounded-3xl max-w-2xl"
                                        : "bg-zinc-900 border border-zinc-800 px-5 py-4 rounded-3xl max-w-3xl text-white"
                                }
                            >
                                {msg.content}
                            </div>

                        </div>
                    ))
                }

            </div>

            {/* Bottom Input */}
            <div className="mt-auto pt-4 border-t border-zinc-800 flex gap-4">

                <input
                    type="text"
                    placeholder="Type here"
                    className="input flex-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    onClick={handleSubmit}
                />

            </div>

        </div>
    )
}

export default Chat
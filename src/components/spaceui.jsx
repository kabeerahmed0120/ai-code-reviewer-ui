import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios"
const SpaceUI = () => {
    const [stars, setStars] = useState([]);

    const [code, setCode] = useState();
    const [review, setReview] = useState();

    const handlePromptCode = async () => {
        try {

            if (!code) {
                return alert("prompt is required");
            }
            const res = await axios.post("http://localhost:3000/ai/review", { code });

            setReview(res.data);

            console.log(code);
        } catch (err) {
            console.log("error aya hai " + err);
        }
    }

    useEffect(() => {
        const generateStars = () => {
            const starArray = [];
            for (let i = 0; i < 100; i++) {
                starArray.push({
                    id: i,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    size: `${Math.random() * 3}px`,
                    delay: `${Math.random() * 5}s`,
                    duration: `${Math.random() * 3 + 2}s`,
                });
            }
            setStars(starArray);
        };
        generateStars();
    }, []);

    return (
        // Main container bg color thora dark kiya hai better contrast k liye
        <div className="relative min-h-screen w-full bg-[#090e1a] overflow-hidden flex items-center justify-center p-4 sm:p-8 font-sans text-white">

            {/* --- BACKGROUND STAR ANIMATION --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-white rounded-full opacity-70 animate-pulse"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            animationDelay: star.delay,
                            animationDuration: star.duration,
                        }}
                    />
                ))}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* --- MAIN CONTAINER --- */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl h-[85vh]">

                {/* --- LEFT SECTION --- */}
                <div className="flex flex-col h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl transition-all hover:border-purple-500/30 group">
                    <h2 className="text-xl font-bold mb-4 text-blue-300 tracking-wider uppercase drop-shadow-sm">Input Command</h2>

                    <div className="relative flex-grow w-full rounded-xl overflow-hidden border border-white/5 focus-within:border-blue-400/50 transition-all">
                        {/* Textarea background transparent taake stars dikhen */}
                        <textarea
                            className="w-full h-full bg-transparent text-lg text-white placeholder-gray-500 p-4 resize-none focus:outline-none focus:ring-0 border-none z-10 relative"
                            placeholder="Type your message to the universe here..."
                            spellCheck="false"
                            onChange={(e) => setCode(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={handlePromptCode} className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 rounded-xl font-bold shadow-lg shadow-purple-900/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 active:scale-95 tracking-wide">
                            Launch Sequence 🚀
                        </button>
                    </div>
                </div>

                {/* --- RIGHT SECTION (with Styled Scrollbar) --- */}
                {/* Yahan 'space-scrollbar' class add ki hai aur 'pr-4' padding di hai */}
                <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 pr-4 overflow-y-auto shadow-xl space-scrollbar hover:border-blue-500/30 transition-all">
                    <h2 className="text-xl font-bold mb-6 text-purple-300 tracking-wider uppercase drop-shadow-sm sticky top-0 bg-[#090e1a]/80 backdrop-blur-md py-2 z-10">Code Logs</h2>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">

                        <ReactMarkdown
                            components={{
                                code({ className, children, ...rest }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return match ? (
                                        <SyntaxHighlighter
                                            PreTag="div"
                                            language={match[1]}
                                            style={dark}
                                            {...rest}
                                        >
                                            {children}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {review}
                        </ReactMarkdown>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SpaceUI;
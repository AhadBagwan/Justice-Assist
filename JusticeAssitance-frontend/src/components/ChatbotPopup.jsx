// // // src/components/ChatbotPopup.jsx
// // import React, { useState } from "react";
// // import { IoMdClose } from "react-icons/io";
// // import Lottie from "lottie-react";
// // import chatbotAnim from "../assets/ChatbotHelp.json";
// // import "./ChatbotPopup.css";
// // import axios from "axios";


// // const ChatbotPopup = () => {
// //   const [open, setOpen] = useState(false);
// //   const [messages, setMessages] = useState([
// //     { from: "bot", text: "Hello 👋 I’m your JusticeAssist chatbot. How can I help you?" },
// //   ]);
// //   const [input, setInput] = useState("");

// //   const handleSend = async () => {
// //     if (!input.trim()) return;
  
// //     setMessages((prev) => [...prev, { from: "user", text: input }]);
// //     const userMessage = input;
// //     setInput("");
  
// //     try {
// //       const res = await axios.post(
// //         "http://127.0.0.1:5000/ai/get-guidance",
// //         { query: userMessage },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 JWT stored after login
// //           },
// //         }
// //       );
  
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           from: "bot",
// //           text: res.data.guidance || "No response from AI.",
// //         },
// //       ]);
// //     } catch (err) {
// //       console.error(err);
// //       setMessages((prev) => [
// //         ...prev,
// //         { from: "bot", text: "⚠️ Authentication error or server issue." },
// //       ]);
// //     }
// //   };
  
  

// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       handleSend();
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Floating Chat Button */}
// //       <button className="chatbot-button" onClick={() => setOpen(!open)}>
// //         <Lottie animationData={chatbotAnim} loop={true} className="chatbot-lottie" />
// //       </button>

// //       {/* Popup Chat Window */}
// //       {open && (
// //         <div className="chatbot-popup">
// //           {/* Header */}
// //           <div className="chatbot-header">
// //             <h3>JusticeAssist Chatbot</h3>
// //             <button onClick={() => setOpen(false)}>
// //               <IoMdClose size={20} />
// //             </button>
// //           </div>

// //           {/* Messages */}
// //           <div className="chatbot-messages">
// //             {messages.map((msg, index) => (
// //               <div
// //                 key={index}
// //                 className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}
// //               >
// //                 {msg.text}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Input */}
// //           <div className="chatbot-input-container">
// //             <input
// //               type="text"
// //               placeholder="Type your message..."
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               className="chatbot-input"
// //             />
// //             <button className="chatbot-send-btn" onClick={handleSend}>
// //               ➤
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatbotPopup;

// // src/components/ChatbotPopup.jsx
// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import Lottie from "lottie-react";
// import chatbotAnim from "../assets/ChatbotHelp.json";
// import "./ChatbotPopup.css";
// import axios from "axios"; // 👈 Ensure axios is imported

// const ChatbotPopup = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hello 👋 I’m your JusticeAssist chatbot. How can I help you?" },
//   ]);
//   const [input, setInput] = useState("");

//   // 👇 LOGIC UPDATED TO BE ASYNC AND CALL THE REAL API
//   const handleSend = async () => {
//     if (!input.trim()) return;
  
//     const userMessage = input;
//     setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
//     setInput("");
  
//     try {
//       // Retrieve the token from localStorage
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setMessages((prev) => [
//             ...prev,
//             { from: "bot", text: "Authentication error. Please log in again." },
//         ]);
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/ai/get-guidance`, // Use the .env variable
//         { query: userMessage },
//         {
//           headers: {
//             // Include the JWT token in the Authorization header
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       // Update chat with the AI's response
//       setMessages((prev) => [
//         ...prev,
//         {
//           from: "bot",
//           text: response.data.guidance || "I received a response, but it was empty.",
//         },
//       ]);
//     } catch (err) {
//       console.error("Chatbot API error:", err);
//       // Provide user-friendly error feedback
//       const errorMessage = err.response?.status === 401 
//         ? "Your session has expired. Please log in again."
//         : "Sorry, I'm having trouble connecting to the server.";
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `⚠️ ${errorMessage}` },
//       ]);
//     }
//   };
  
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div>
//       {/* Floating Chat Button */}
//       <button className="chatbot-button" onClick={() => setOpen(!open)}>
//         <Lottie animationData={chatbotAnim} loop={true} className="chatbot-lottie" />
//       </button>

//       {/* Popup Chat Window */}
//       {open && (
//         <div className="chatbot-popup">
//           {/* Header */}
//           <div className="chatbot-header">
//             <h3>JusticeAssist Chatbot</h3>
//             <button onClick={() => setOpen(false)}>
//               <IoMdClose size={20} />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="chatbot-messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="chatbot-input-container">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="chatbot-input"
//             />
//             <button className="chatbot-send-btn" onClick={handleSend}>
//               ➤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotPopup;

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Lottie from "lottie-react";
import chatbotAnim from "../assets/ChatbotHelp.json";
import "./ChatbotPopup.css";
import axios from "axios";

const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 I’m your JusticeAssist chatbot. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added for loading state

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication error. Please log in again.");
      }

      // This is the correct API call to your backend.
      // Your backend will now handle the call to OpenRouter.
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ai/get-guidance`,
        { query: userMessage.text }, // Use the text from the message object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botResponse = {
        from: "bot",
        text: response.data.guidance || "I received a response, but it was empty.",
      };
      setMessages((prev) => [...prev, botResponse]);

    } catch (err) {
      console.error("ChatbotPopup API error:", err);
      const errorMessage = err.response?.status === 401
        ? "Your session has expired. Please log in again."
        : "Sorry, I'm having trouble connecting to the server.";
      
      const errorResponse = { from: "bot", text: `⚠️ ${errorMessage}` };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        <Lottie animationData={chatbotAnim} loop={true} className="chatbot-lottie" />
      </button>

      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>JusticeAssist Chatbot</h3>
            <button onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.from}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="chatbot-message bot">Typing...</div>}
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chatbot-input"
              disabled={isLoading}
            />
            <button className="chatbot-send-btn" onClick={handleSend} disabled={isLoading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
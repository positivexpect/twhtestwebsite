'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) {
      alert('Please enter a message!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('https://chatbot.thewindowhospital.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      setResponse(data.response);
      setUserInput(''); // Clear input after successful send
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div 
        onClick={toggleChatbot}
        className="fixed bottom-5 left-5 bg-[#CD2028] text-white px-5 py-3 rounded cursor-pointer z-50 shadow-lg text-base font-bold hover:bg-[#B01B22] transition-colors"
      >
        Ask Questions Now
      </div>

      {/* Floating Chatbot Form */}
      <div 
        className={`fixed bottom-20 left-5 w-[300px] bg-white rounded-lg shadow-xl z-50 p-4 font-sans text-gray-800 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-base font-bold text-[#CD2028]">
            Welcome to The Window Hospital Intake Coordinator! How can I assist you today?
          </span>
          <button 
            onClick={toggleChatbot}
            className="bg-transparent border-none text-lg cursor-pointer text-[#CD2028] hover:text-[#B01B22]"
          >
            X
          </button>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            className="px-3 py-2 mb-2 rounded border border-gray-300 text-sm text-gray-800"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="px-3 py-2 bg-[#CD2028] text-white border-none rounded cursor-pointer mt-1 text-sm hover:bg-[#B01B22] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              'Send'
            )}
          </button>
          {response && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              {response}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
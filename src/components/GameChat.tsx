import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function GameChat() {
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement Socket.IO message sending
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Game Chat
      </h2>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {/* Example messages */}
        <div className="bg-gray-700/50 rounded-lg p-2">
          <span className="text-blue-400 font-medium">Player 1: </span>
          <span>I think Player 3 is suspicious</span>
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // We want to merge consecutive assistant messages if they are partial updates, 
  // but our hook handles updating the last message. 
  // We just render the list.

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
      {messages.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          <p>Start a conversation to see the transcript here.</p>
        </div>
      )}
      
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white rounded-br-none'
                : 'bg-slate-700 text-slate-200 rounded-bl-none'
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
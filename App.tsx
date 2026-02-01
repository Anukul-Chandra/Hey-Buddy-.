import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Globe, Heart, MessageSquare, Send, X, Keyboard } from 'lucide-react';
import { useLiveSession } from './hooks/useLiveSession';
import { Visualizer } from './components/Visualizer';
import { ChatHistory } from './components/ChatHistory';
import { ConnectionState } from './types';

const App: React.FC = () => {
  const { connect, disconnect, status, messages, volume, error, sendTextMessage } = useLiveSession();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const isConnected = status === ConnectionState.CONNECTED;
  const isConnecting = status === ConnectionState.CONNECTING;
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && isConnected) {
        sendTextMessage(inputText);
        setInputText('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Globe className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Hey Buddy</h1>
              <p className="text-xs text-cyan-400 font-medium">Your Deshi English Coach</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-500'}`}></span>
            <span className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
              {status === ConnectionState.CONNECTED ? 'Live' : status}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl flex flex-col relative overflow-hidden">
        
        {/* Error Banner */}
        {error && (
           <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 m-4 rounded-lg text-center text-sm">
             {error}
           </div>
        )}

        {/* Chat Area */}
        <ChatHistory messages={messages} />

        {/* Floating Controls Container */}
        <div className="w-full p-6 pb-6 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent z-20">
            
            {/* Persona Hint */}
            {!isConnected && messages.length === 0 && (
              <div className="text-center mb-8 space-y-2">
                <h2 className="text-2xl text-white font-light">Ki obostha? Ready?</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  I'm your Deshi Bandhobi. We can talk about anything—life, gossip, or study. I'll fix your grammar as we chat!
                </p>
              </div>
            )}

            {/* Visualizer Area */}
            <div className="mb-6 flex justify-center min-h-[100px]">
               {isConnected ? (
                 <Visualizer 
                    inputVolume={volume.input} 
                    outputVolume={volume.output} 
                    isActive={true} 
                 />
               ) : (
                  <div className="flex items-center justify-center h-24 text-slate-600">
                    <Volume2 className="w-8 h-8 opacity-20" />
                  </div>
               )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
                
                {/* Text Input Overlay */}
                {isChatOpen && isConnected && (
                    <form onSubmit={handleSendMessage} className="flex gap-2 w-full max-w-md mx-auto animate-in slide-in-from-bottom-5 fade-in">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!inputText.trim()}
                            className="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                )}

                <div className="flex items-center justify-center gap-4">
                    {/* Chat Toggle Button */}
                    {isConnected && (
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`p-4 rounded-full transition-all duration-200 ${isChatOpen ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                            title="Toggle Text Chat"
                        >
                            {isChatOpen ? <X className="w-6 h-6" /> : <Keyboard className="w-6 h-6" />}
                        </button>
                    )}

                    {/* Main Connection Button */}
                    <button
                    onClick={isConnected ? disconnect : connect}
                    disabled={isConnecting}
                    className={`
                        relative group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
                        ${isConnected 
                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50' 
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)]'
                        }
                        ${isConnecting ? 'opacity-70 cursor-wait' : ''}
                    `}
                    >
                    {isConnecting ? (
                        <span>Connecting...</span>
                    ) : isConnected ? (
                        <>
                        <MicOff className="w-5 h-5" />
                        <span>End Adda</span>
                        </>
                    ) : (
                        <>
                        <Mic className="w-5 h-5" />
                        <span>Start Adda</span>
                        </>
                    )}
                    </button>
                </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                 Powered by Gemini 2.5 Live API <Heart className="w-3 h-3 text-red-500 fill-red-500/20" />
              </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
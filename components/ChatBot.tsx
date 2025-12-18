import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from './Icon';
import { chatWithQuantumBot } from '../services/geminiService';
import { ChatMessage, ChatSettings, Source } from '../types';
import { GenerateContentResponse } from '@google/genai';

const LOCAL_STORAGE_KEY = 'nexus_chat_history_v1';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Initialize with persisted state or default
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Advanced Settings State
  const [settings, setSettings] = useState<ChatSettings>({
    enableSearch: true,
    enableThinking: false, // Default to false for faster standard chat
    creativity: 0.7
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
        resetChat();
      }
    } else {
      resetChat();
    }
  }, []);

  // Save history on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const resetChat = () => {
    const initialMsg: ChatMessage = { 
        id: 'init', 
        role: 'model', 
        text: 'Hello. I am the Nexus Advanced Assistant. I can help you code, write content, or analyze business strategies. How can I assist you today?', 
        timestamp: Date.now() 
    };
    setMessages([initialMsg]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Prepare history for API (map to Gemini format)
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await chatWithQuantumBot(history, userMsg.text, settings);
      
      let fullResponse = "";
      const botMsgId = (Date.now() + 1).toString();
      
      // Add placeholder message
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', timestamp: Date.now() }]);
      
      const collectedSources: Source[] = [];

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        
        // Extract Grounding Metadata (Web Sources)
        if (c.candidates && c.candidates[0]?.groundingMetadata?.groundingChunks) {
           c.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
             if (chunk.web) {
               collectedSources.push({
                 title: chunk.web.title,
                 uri: chunk.web.uri
               });
             }
           });
        }

        if (c.text) {
          fullResponse += c.text;
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: fullResponse, sources: collectedSources.length > 0 ? collectedSources : undefined } : msg
          ));
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: 'ERR: Quantum decoherence detected. Please retry.', timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border border-white/20"
      >
        {isOpen ? <Icon name="x" className="w-6 h-6" /> : <Icon name="message-square" className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[450px] max-w-[90vw] h-[700px] max-h-[80vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans">
          
          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Icon name="cpu" className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Nexus Assistant</div>
                <div className="flex items-center gap-1">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="text-xs text-gray-500">ChatGPT-4o Level</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button 
                 onClick={resetChat}
                 className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                 title="Clear Memory"
               >
                 <Icon name="trash-2" className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setShowSettings(!showSettings)} 
                 className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                 title="Bot Configuration"
               >
                 <Icon name="zap" className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Settings Panel Overlay */}
          {showSettings && (
             <div className="bg-gray-50 p-4 border-b border-gray-200 animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3">
                   <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Model Configuration</div>
                   <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-black"><Icon name="x" className="w-3 h-3" /></button>
                </div>
                
                {/* Search Toggle */}
                <div className="flex items-center justify-between mb-3 p-2 bg-white rounded-lg border border-gray-200">
                   <div className="flex items-center gap-2">
                      <Icon name="globe" className="w-4 h-4 text-blue-500" />
                      <div>
                         <div className="font-bold text-xs">Web Access</div>
                         <div className="text-[10px] text-gray-500">Google Search Grounding</div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setSettings(s => ({...s, enableSearch: !s.enableSearch}))}
                     className={`w-8 h-4 rounded-full relative transition-colors ${settings.enableSearch ? 'bg-black' : 'bg-gray-300'}`}
                   >
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${settings.enableSearch ? 'left-4.5' : 'left-0.5'}`} />
                   </button>
                </div>

                {/* Thinking Toggle */}
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                   <div className="flex items-center gap-2">
                      <Icon name="brain" className="w-4 h-4 text-purple-500" />
                      <div>
                         <div className="font-bold text-xs">Deep Reasoning</div>
                         <div className="text-[10px] text-gray-500">CoT Thinking Process</div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setSettings(s => ({...s, enableThinking: !s.enableThinking}))}
                     className={`w-8 h-4 rounded-full relative transition-colors ${settings.enableThinking ? 'bg-black' : 'bg-gray-300'}`}
                   >
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${settings.enableThinking ? 'left-4.5' : 'left-0.5'}`} />
                   </button>
                </div>
             </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-black text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {/* ReactMarkdown for Rich Text Rendering */}
                  <ReactMarkdown 
                    className={`prose ${msg.role === 'user' ? 'prose-invert' : 'prose-gray'} prose-sm max-w-none break-words`}
                    components={{
                      code({node, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <div className="rounded-md bg-gray-900 p-2 my-2 overflow-x-auto text-xs text-white font-mono">
                            <code>{children}</code>
                          </div>
                        ) : (
                          <code className="bg-black/10 px-1 py-0.5 rounded font-mono text-xs" {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>

                {/* Citations / Sources */}
                {msg.sources && msg.sources.length > 0 && (
                   <div className="mt-2 ml-1 max-w-[85%]">
                      <div className="flex flex-wrap gap-2">
                         {msg.sources.map((source, idx) => (
                            <a 
                              key={idx} 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 hover:underline px-2 py-1 rounded-full border border-blue-100 transition-colors"
                            >
                              <Icon name="search" className="w-3 h-3" />
                              {source.title}
                            </a>
                         ))}
                      </div>
                   </div>
                )}
                
                {/* Timestamp */}
                <div className="text-[10px] text-gray-300 mt-1 px-1">
                   {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-2">
                 <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={settings.enableThinking ? "Ask a complex question (Reasoning active)..." : "Message Nexus Assistant..."}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all resize-none h-12 max-h-32 text-sm"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-gray-400">
                 Nexus AI can make mistakes. Check important info.
               </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
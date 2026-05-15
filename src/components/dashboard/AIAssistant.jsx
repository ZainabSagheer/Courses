"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Send, Sparkles, Mic, Paperclip, 
  Languages, FileText, Calendar, Zap, RefreshCw
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Greeting Scholar! I am your BITSOL AI Tutor. How can I accelerate your learning today?', time: '08:00 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Analyzing your query... I have cross-referenced the React lecture notes. Would you like a summary or a practical code example?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-250px)]">
      {/* Sidebar - AI Tools */}
      <div className="xl:col-span-1 space-y-6">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 mb-8">
          <Bot className="w-6 h-6 text-primary" />
          AI ASSISTANT
        </h2>

        <div className="space-y-4">
            {[
                { label: 'Study Planner', icon: Calendar, desc: 'Generate personalized schedule' },
                { label: 'Summarizer', icon: FileText, desc: 'Convert lectures to notes' },
                { label: 'Translator', icon: Languages, desc: 'English ↔ Urdu translation' },
                { label: 'Quiz Gen', icon: Zap, desc: 'Practice based on lectures' },
            ].map((tool, i) => (
                <button key={i} className="w-full p-4 rounded-2xl bg-card border border-card-border hover:border-primary/30 hover:bg-card/80 transition-all text-left group">
                    <div className="flex items-center gap-3 mb-1">
                        <tool.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest">{tool.label}</span>
                    </div>
                    <p className="text-[10px] text-foreground/40 font-light">{tool.desc}</p>
                </button>
            ))}
        </div>

        <TiltCard className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mt-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">AI Usage</h4>
            <div className="h-1.5 w-full bg-card rounded-full overflow-hidden mb-2">
                <div className="h-full w-[65%] bg-primary shadow-[0_0_10px_var(--primary)]" />
            </div>
            <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest">650 / 1000 Tokens used</p>
        </TiltCard>
      </div>

      {/* Main Chat Interface */}
      <div className="xl:col-span-3 flex flex-col bg-card border border-card-border rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background/40 to-transparent flex items-center justify-between px-8 z-10 backdrop-blur-md border-b border-card-border">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm">BITSOL AI TUTOR</h3>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Systems Optimized</span>
                    </div>
                </div>
            </div>
            <button className="p-2 rounded-xl bg-card hover:bg-card/80 transition-all">
                <RefreshCw className="w-4 h-4 text-foreground/40" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-24 space-y-8 custom-scrollbar">
            <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-5 rounded-3xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-background rounded-tr-none' : 'bg-card border border-card-border rounded-tl-none'}`}>
                                {msg.content}
                            </div>
                            <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest mt-2 px-1">{msg.time}</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        <div className="p-6 bg-background/40 border-t border-card-border">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-card border border-card-border focus-within:border-primary/50 transition-all">
                    <button className="p-3 rounded-xl hover:bg-card/80 text-foreground/20 hover:text-primary transition-all">
                        <Paperclip className="w-4 h-4" />
                    </button>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything about your courses..." 
                        className="flex-1 bg-transparent py-3 text-sm focus:outline-none placeholder:text-foreground/20"
                    />
                    <button className="p-3 rounded-xl hover:bg-card/80 text-foreground/20 hover:text-primary transition-all">
                        <Mic className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleSend}
                        className="p-3 rounded-xl bg-primary text-background shadow-lg hover:scale-105 transition-all"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-[9px] font-bold text-foreground/20 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary" /> AI Augmented</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-primary" /> Low Latency</span>
            </div>
        </div>
      </div>
    </div>
  );
};

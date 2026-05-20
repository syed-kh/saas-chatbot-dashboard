import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return match ? (
    <div className="rounded-xl overflow-hidden border border-secondary my-4 bg-[#1E1E1E]">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-secondary">
        <span className="text-xs text-text-muted">{match[1]}</span>
        <button 
          onClick={handleCopy}
          className="text-text-muted hover:text-text-main transition-colors flex items-center gap-1.5 text-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-text-main font-mono">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  ) : (
    <code {...props} className="bg-secondary/50 px-1.5 py-0.5 rounded text-primary text-sm font-mono">
      {children}
    </code>
  );
};

export default function ChatMessage({ message }) {
  const isAI = message.role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-4 max-w-4xl mx-auto w-full group", isAI ? "" : "flex-row-reverse")}
    >
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1", isAI ? "bg-primary" : "bg-secondary")}>
        {isAI ? (
          <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
        ) : (
          <img src="https://i.pravatar.cc/150?u=arjun" alt="User" className="w-8 h-8 rounded-full" />
        )}
      </div>

      <div className={cn("flex flex-col max-w-[80%]", isAI ? "items-start" : "items-end")}>
        <div className="flex items-center gap-2 mb-1.5 px-1">
          <span className="text-sm font-medium text-text-main">{isAI ? 'Nova AI' : 'You'}</span>
          <span className="text-xs text-text-muted">{message.timestamp}</span>
        </div>

        <div className={cn(
          "px-5 py-3.5 rounded-2xl", 
          isAI ? "bg-transparent text-text-main" : "bg-card border border-primary/20 text-text-main"
        )}>
          {isAI ? (
            <div className="whitespace-pre-wrap leading-relaxed text-sm">
              {message.content.split('```').map((block, index) => {
                if (index % 2 === 1) {
                  const [lang, ...code] = block.split('\n');
                  return (
                    <div key={index} className="rounded-xl overflow-hidden border border-secondary my-4 bg-[#1E1E1E]">
                      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-secondary">
                        <span className="text-xs text-text-muted">{lang}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm text-text-main font-mono">
                        <code>{code.join('\n')}</code>
                      </pre>
                    </div>
                  );
                }
                return <span key={index}>{block}</span>;
              })}
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {isAI && (
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity px-2">
            <button className="text-text-muted hover:text-text-main p-1 rounded hover:bg-secondary transition-colors">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="text-text-muted hover:text-text-main p-1 rounded hover:bg-secondary transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button className="text-text-muted hover:text-text-main p-1 rounded hover:bg-secondary transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

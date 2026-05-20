import { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

// Map display names → OpenRouter model IDs
const MODEL_IDS = {
  'GPT-4o':             'openai/gpt-4o',
  'GPT-4o mini':        'openai/gpt-4o-mini',
  'Claude 3.5 Sonnet':  'anthropic/claude-3.5-sonnet',
  'Claude 3 Haiku':     'anthropic/claude-3-haiku',
  'Gemini 1.5 Pro':     'google/gemini-pro-1.5',
  'Gemini Flash':       'google/gemini-flash-1.5',
};

export default function ChatInput() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const { addMessage, activeChatId } = useStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleSend = async () => {
    if (!text.trim() || !activeChatId) return;

    const userText = text;
    setText('');

    addMessage({
      id: Date.now().toString(),
      chatId: activeChatId,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const aiMessageId = (Date.now() + 1).toString();
    addMessage({
      id: aiMessageId,
      chatId: activeChatId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const state = useStore.getState();
    state.setIsTyping(true);

    // Build history from existing messages only (don't add user message again — it's already added above)
    const history = state.messages
      .filter(m => m.chatId === activeChatId && m.content)
      .map(m => ({ role: m.role, content: m.content }));

    // Resolve the model to its OpenRouter ID
    const modelId = MODEL_IDS[state.activeModel] || 'openai/gpt-4o';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          model: modelId,
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Network response was not ok';
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                state.updateStreamingMessage(aiMessageId, '\n\n**Error:** ' + data.error);
                break;
              }
              if (data.done) {
                // Handle final token count if needed
                break;
              }
              if (data.content) {
                state.updateStreamingMessage(aiMessageId, data.content);
              }
            } catch (err) {
              console.error('Error parsing SSE JSON:', err);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      state.updateStreamingMessage(aiMessageId, '\n\n**Connection Error:** Make sure the backend server is running and your API key is set.');
    } finally {
      useStore.getState().setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-background">
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-card rounded-2xl border border-secondary p-3 flex flex-col gap-3">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Nova AI..."
            className="w-full bg-transparent text-text-main placeholder-text-muted resize-none outline-none max-h-[200px] min-h-[44px] leading-relaxed"
            rows={1}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 text-text-muted hover:text-text-main hover:bg-secondary rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-main hover:bg-secondary rounded-lg transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!text.trim()}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
        <div className="text-center mt-3 text-xs text-text-muted">
          Nova AI can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
}

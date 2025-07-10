
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, LoaderCircle, Send, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { chat } from '@/ai/flows/chatbot-flow';
import type { ChatInput } from '@/ai/flows/chatbot-types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Chatbot({ isOpen, setIsOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello! I'm Alpha AI. How can I help you find the perfect product today?",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    const chatInput: ChatInput = { message: input };
    setInput('');
    setLoading(true);

    try {
      const response = await chat(chatInput);
      const assistantMessage: Message = { role: 'assistant', content: response.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I've encountered an unexpected error. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
        className={cn(
          'fixed bottom-[calc(4rem+1.5rem)] right-6 z-40 w-80 rounded-lg shadow-xl transition-all duration-300 ease-in-out sm:w-96',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <Card className="flex h-[32rem] flex-col bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between p-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/logo Alpha.png" alt="Alpha AI" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Alpha AI</h3>
                <p className="text-xs">Your personal assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary/80" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <CardContent className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                     <Avatar className="h-8 w-8">
                        <AvatarImage src="/logo Alpha.png" alt="Alpha AI" />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-foreground'
                    )}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                     <Avatar className="h-8 w-8">
                       <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="/logo Alpha.png" alt="Alpha AI" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </CardContent>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t bg-background rounded-b-lg">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>
  );
}

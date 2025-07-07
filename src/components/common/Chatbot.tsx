'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, Send, X, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatbot } from '@/ai/flows/chatbot-flow';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: 'Hello! I am Alpha AI. How can I help you today? You can ask me about our products, categories, or company information.',
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        const response = await chatbot(userMessage.text);
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'ai',
        };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I'm having trouble connecting. Please try again later.",
            sender: 'ai',
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-lg shadow-xl transition-all duration-300 ease-in-out',
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <Card className="flex flex-col h-[60vh] bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between p-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Alpha AI</h3>
                <p className="text-xs">Your personal assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-2 text-sm',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.sender === 'ai' && (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5 text-primary-foreground"/>
                        </div>
                    )}
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-xs',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-foreground'
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start gap-2">
                         <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5 text-primary-foreground"/>
                        </div>
                        <div className="p-3 rounded-lg bg-background text-foreground flex items-center">
                            <LoaderCircle className="h-4 w-4 animate-spin"/>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 p-3 border-t bg-background rounded-b-lg"
          >
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isLoading}
              autoFocus
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>

      {/* Floating Button */}
      <Button
        size="icon"
        className="bg-primary hover:bg-primary/90 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
        aria-label="Open AI Chat"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-primary-foreground" />
        ) : (
          <Bot className="h-7 w-7 text-primary-foreground" />
        )}
      </Button>
    </>
  );
}

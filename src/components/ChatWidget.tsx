import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [chatMessages, setChatMessages] = useState<{text: string; sender: 'user' | 'bot'}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChatSend = async () => {
    if (!chatInput.trim() || isLoading) return;
    
    const userMessage = { text: chatInput, sender: 'user' as const };
    const currentInput = chatInput;
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/11622567-5a4c-4795-a736-335ad0ebdb02', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput })
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
        setChatMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
      } else {
        setChatMessages(prev => [...prev, { 
          text: 'Извините, произошла ошибка. Попробуйте еще раз или свяжитесь с нами: yaer5hov@yandex.ru', 
          sender: 'bot' 
        }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        text: 'Не удалось подключиться к серверу. Проверьте интернет-соединение.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-2xl border flex flex-col z-50">
      <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="MessageCircle" size={20} />
          <span className="font-semibold">Чат с роботом</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-primary-dark"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Icon name="Bot" size={48} className="mx-auto mb-3 text-primary" />
            <p>Здравствуйте! Я бот поддержки АвтоПост.</p>
            <p className="text-sm mt-1">Задайте ваш вопрос!</p>
          </div>
        )}
        
        {chatMessages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-line ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-3 flex gap-2">
        <Input 
          placeholder="Напишите сообщение..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSend()}
          disabled={isLoading}
        />
        <Button onClick={handleChatSend} size="icon" disabled={isLoading}>
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </div>
  );
};
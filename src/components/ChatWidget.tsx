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

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { text: chatInput, sender: 'user' as const };
    setChatMessages([...chatMessages, userMessage]);
    
    const responses: Record<string, string> = {
      'тариф': 'У нас 3 тарифа: Стартовый (990₽), Профессионал (2990₽) и Корпоративный (9990₽). Каждый включает публикацию на Авито, Дром и Авто.ру.',
      'помощь': 'Я могу помочь вам с вопросами о тарифах, публикации объявлений и использовании платформы. Задайте ваш вопрос!',
      'объявление': 'Создать объявление просто: нажмите "Создать", заполните форму с данными авто и загрузите фото. Мы автоматически опубликуем его на всех площадках.',
      'контакт': 'Связаться можно по email yaer5hov@yandex.ru или телефону +7 915 321 88 71 (Пн-Пт 9:00-18:00).',
      'привет': 'Здравствуйте! Я бот поддержки АвтоПост. Чем могу помочь?',
      'шаблон': 'У нас есть готовые шаблоны описаний для разных типов авто: седаны, внедорожники, компактные и другие. Перейдите в раздел "Шаблоны".'
    };
    
    setTimeout(() => {
      const keyword = Object.keys(responses).find(key => chatInput.toLowerCase().includes(key));
      const botResponse = keyword 
        ? responses[keyword]
        : 'Спасибо за вопрос! Наши специалисты ответят вам на email yaer5hov@yandex.ru или позвоните +7 915 321 88 71.';
      
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
    
    setChatInput('');
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
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-3 flex gap-2">
        <Input 
          placeholder="Напишите сообщение..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
        />
        <Button onClick={handleChatSend} size="icon">
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </div>
  );
};

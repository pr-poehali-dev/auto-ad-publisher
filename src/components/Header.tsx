import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">АвтоПост</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => setActiveTab('home')}>Главная</Button>
            <Button variant="ghost" onClick={() => setActiveTab('listings')}>Мои объявления</Button>
            <Button variant="ghost" onClick={() => setActiveTab('templates')}>Шаблоны</Button>
            <Button variant="ghost" onClick={() => setActiveTab('pricing')}>Тарифы</Button>
            <Button variant="ghost" onClick={() => setActiveTab('guide')}>Инструкция</Button>
            <Button variant="ghost" onClick={() => setActiveTab('support')}>Поддержка</Button>
          </nav>
          <Button className="gap-2" onClick={() => setActiveTab('create')}>
            <Icon name="Plus" size={18} />
            Создать
          </Button>
        </div>
      </div>
    </header>
  );
};

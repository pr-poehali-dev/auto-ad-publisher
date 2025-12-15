import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { AppTabs } from '@/components/AppTabs';
import { ChatWidget } from '@/components/ChatWidget';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

interface CarListing {
  id: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  description: string;
  status: 'active' | 'pending';
  platforms: string[];
  photos: string[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [listings, setListings] = useState<CarListing[]>([
    {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      year: '2020',
      mileage: '45000',
      price: '2500000',
      description: 'Отличное состояние, один владелец',
      status: 'active',
      platforms: ['Авито', 'Дром', 'Авто.ру'],
      photos: []
    }
  ]);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: ''
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const templates: Template[] = [
    {
      id: '1',
      name: 'Седан премиум',
      category: 'Легковые',
      description: 'Автомобиль в отличном состоянии. Полная комплектация, кожаный салон, панорамная крыша. Один владелец, вся история обслуживания у официального дилера. Не битый, не крашеный. Все ТО пройдены вовремя.',
      icon: 'Car'
    },
    {
      id: '2',
      name: 'Внедорожник',
      category: 'Внедорожники',
      description: 'Мощный внедорожник с полным приводом. Отличная проходимость, надежный двигатель. Идеален для бездорожья и дальних поездок. Кузов и рама без повреждений, все узлы в рабочем состоянии.',
      icon: 'Mountain'
    },
    {
      id: '3',
      name: 'Компактный городской',
      category: 'Легковые',
      description: 'Экономичный автомобиль для города. Малый расход топлива, компактные размеры, легкая парковка. Идеально подходит для ежедневных поездок. Техническое состояние отличное, все системы исправны.',
      icon: 'Home'
    },
    {
      id: '4',
      name: 'Семейный минивэн',
      category: 'Минивэны',
      description: 'Просторный семейный автомобиль на 7 мест. Комфортный салон, большой багажник, климат-контроль. Отличный вариант для больших семей и путешествий. Бережная эксплуатация, полный пакет документов.',
      icon: 'Users'
    },
    {
      id: '5',
      name: 'Бизнес-класс',
      category: 'Представительские',
      description: 'Премиальный автомобиль бизнес-класса. Максимальный уровень комфорта и безопасности. Кожаный салон, мультимедийная система, адаптивный круиз-контроль. Автомобиль обслуживался только у официального дилера.',
      icon: 'Briefcase'
    },
    {
      id: '6',
      name: 'Спортивное купе',
      category: 'Спортивные',
      description: 'Динамичный спортивный автомобиль. Мощный двигатель, агрессивный дизайн, отличная управляемость. Спортивная подвеска, улучшенная тормозная система. Для тех, кто ценит скорость и драйв.',
      icon: 'Zap'
    }
  ];

  const applyTemplate = (template: Template) => {
    setFormData({
      ...formData,
      description: template.description
    });
    toast.success(`Шаблон "${template.name}" применен`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 20 - photos.length).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 20 - photos.length).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: CarListing = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      platforms: ['Авито', 'Дром', 'Авто.ру'],
      photos: photos
    };
    setListings([...listings, newListing]);
    setFormData({
      brand: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      description: ''
    });
    setPhotos([]);
    toast.success('Объявление создано! Публикация на площадках...');
    setActiveTab('listings');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <AppTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          setFormData={setFormData}
          photos={photos}
          setPhotos={setPhotos}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          listings={listings}
          templates={templates}
          applyTemplate={applyTemplate}
          handlePhotoUpload={handlePhotoUpload}
          handleDrop={handleDrop}
          removePhoto={removePhoto}
          handleSubmit={handleSubmit}
          setIsChatOpen={setIsChatOpen}
        />
      </Tabs>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { AppTabs } from '@/components/AppTabs';
import { ChatWidget } from '@/components/ChatWidget';
import { getAllBrands, getModelsByBrand } from '@/data/carDatabase';

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
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const handleBrandChange = (brand: string) => {
    setFormData({ ...formData, brand, model: '' });
    setAvailableModels(getModelsByBrand(brand));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.loading('Публикуем объявление на площадках...', { id: 'publish' });
    
    try {
      const response = await fetch('https://functions.poehali.dev/8a180d82-6f28-4d54-9039-3407c032e1dc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          mileage: formData.mileage,
          price: formData.price,
          description: formData.description,
          photos: photos
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        const newListing: CarListing = {
          id: result.listing_id,
          ...formData,
          status: 'active',
          platforms: result.platforms.map((p: any) => p.name),
          photos: photos
        };
        
        setListings([...listings, newListing]);
        
        const publishedCount = result.platforms.filter((p: any) => p.status === 'published').length;
        const pendingCount = result.platforms.filter((p: any) => p.status === 'pending').length;
        
        let message = '';
        if (publishedCount > 0) {
          message = `Опубликовано на ${publishedCount} площадках! `;
        }
        if (pendingCount > 0) {
          message += `${pendingCount} площадок в очереди (требуется настройка API).`;
        }
        
        toast.success(message || 'Объявление создано!', { id: 'publish' });
        
        result.platforms.forEach((platform: any) => {
          if (platform.status === 'published') {
            toast.success(`${platform.name}: ${platform.message}`, { 
              duration: 5000,
              action: {
                label: 'Открыть',
                onClick: () => window.open(platform.url, '_blank')
              }
            });
          }
        });
        
        setFormData({
          brand: '',
          model: '',
          year: '',
          mileage: '',
          price: '',
          description: ''
        });
        setPhotos([]);
        setAvailableModels([]);
        setActiveTab('listings');
      } else {
        toast.error('Не удалось опубликовать объявление', { id: 'publish' });
      }
    } catch (error) {
      toast.error('Ошибка при публикации. Проверьте интернет-соединение.', { id: 'publish' });
    }
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
          availableBrands={getAllBrands()}
          availableModels={availableModels}
          onBrandChange={handleBrandChange}
        />
      </Tabs>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
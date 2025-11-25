import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="home" className="mt-0">
          <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">
                  🚀 Размещайте быстрее в 10 раз
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Разместите авто на всех площадках за 2 минуты
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Авито, Дром и Авто.ру — одна форма, три платформы. Экономьте время и продавайте быстрее
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" className="gap-2 hover-scale" onClick={() => setActiveTab('create')}>
                    <Icon name="Zap" size={20} />
                    Создать объявление
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 hover-scale" onClick={() => setActiveTab('guide')}>
                    <Icon name="Play" size={20} />
                    Как работает
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Почему выбирают нас</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Современный сервис для профессионалов и частных продавцов
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover-scale border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Rocket" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Мгновенное размещение</CardTitle>
                    <CardDescription>
                      Автоматическая публикация на Авито, Дром и Авто.ру одним кликом
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="FileStack" size={24} className="text-accent" />
                    </div>
                    <CardTitle>Шаблоны и массовая загрузка</CardTitle>
                    <CardDescription>
                      Создавайте шаблоны описаний и загружайте объявления пачками
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="BarChart3" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Статистика просмотров</CardTitle>
                    <CardDescription>
                      Отслеживайте эффективность объявлений в реальном времени
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-accent transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="RefreshCw" size={24} className="text-accent" />
                    </div>
                    <CardTitle>Автопродление</CardTitle>
                    <CardDescription>
                      Объявления поднимаются автоматически для максимальных просмотров
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-accent transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Database" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Интеграция с CRM</CardTitle>
                    <CardDescription>
                      Синхронизация с вашей системой учета для полного контроля
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Shield" size={24} className="text-accent" />
                    </div>
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>
                      Защищенное хранение данных и авторизация через API площадок
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-3xl font-bold mb-4">Готовы начать?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам продавцов, которые экономят время с АвтоПост
              </p>
              <Button size="lg" className="gap-2 hover-scale" onClick={() => setActiveTab('create')}>
                <Icon name="ArrowRight" size={20} />
                Создать первое объявление
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="create" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-3">Создать объявление</h2>
                <p className="text-muted-foreground">
                  Заполните данные один раз — разместим на всех площадках
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Информация об автомобиле</CardTitle>
                  <CardDescription>
                    После создания объявление будет опубликовано на Авито, Дром и Авто.ру
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-base font-semibold">Быстрое заполнение</Label>
                        <Button 
                          type="button" 
                          variant="link" 
                          size="sm"
                          onClick={() => setActiveTab('templates')}
                          className="gap-1"
                        >
                          <Icon name="FileText" size={16} />
                          Все шаблоны
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {templates.slice(0, 3).map((template) => (
                          <Button
                            key={template.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => applyTemplate(template)}
                            className="justify-start gap-2 h-auto py-2"
                          >
                            <Icon name={template.icon as any} size={16} />
                            <span className="text-xs">{template.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Марка *</Label>
                        <Input
                          id="brand"
                          placeholder="Toyota"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Модель *</Label>
                        <Input
                          id="model"
                          placeholder="Camry"
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Год выпуска *</Label>
                        <Input
                          id="year"
                          type="number"
                          placeholder="2020"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mileage">Пробег (км) *</Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="45000"
                          value={formData.mileage}
                          onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Цена (₽) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="2500000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Описание *</Label>
                      <Textarea
                        id="description"
                        placeholder="Опишите состояние автомобиля, комплектацию, историю обслуживания..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Фотографии (до 20 штук)</Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="photos"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                        <label htmlFor="photos" className="cursor-pointer">
                          <div className="flex flex-col items-center gap-2">
                            <Icon name="Upload" size={40} className="text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Перетащите фото сюда или <span className="text-primary underline">выберите файлы</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Загружено: {photos.length} / 20
                            </p>
                          </div>
                        </label>
                      </div>

                      {photos.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative group aspect-square">
                              <img
                                src={photo}
                                alt={`Фото ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                <Icon name="X" size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button type="button" variant="outline" onClick={() => setActiveTab('home')}>
                        Отмена
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Icon name="Send" size={18} />
                        Опубликовать на всех площадках
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="templates" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-3">Шаблоны объявлений</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Готовые описания для быстрого создания объявлений. Выберите подходящий шаблон и адаптируйте под свой автомобиль
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {templates.map((template) => (
                  <Card key={template.id} className="hover-scale">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={template.icon as any} size={24} className="text-primary" />
                        </div>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-4">
                        {template.description}
                      </p>
                      <Button 
                        className="w-full gap-2" 
                        onClick={() => {
                          applyTemplate(template);
                          setActiveTab('create');
                        }}
                      >
                        <Icon name="Copy" size={16} />
                        Применить шаблон
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Нужен индивидуальный шаблон для вашего автосалона?
                </p>
                <Button variant="outline" onClick={() => setActiveTab('support')}>
                  Связаться с поддержкой
                </Button>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="listings" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Мои объявления</h2>
                  <p className="text-muted-foreground">
                    Всего объявлений: {listings.length}
                  </p>
                </div>
                <Button className="gap-2" onClick={() => setActiveTab('create')}>
                  <Icon name="Plus" size={18} />
                  Создать новое
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} className="hover-scale">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {listing.brand} {listing.model}
                          </CardTitle>
                          <CardDescription>
                            {listing.year} • {parseInt(listing.mileage).toLocaleString()} км
                          </CardDescription>
                        </div>
                        <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                          {listing.status === 'active' ? 'Активно' : 'В обработке'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-primary">
                        {parseInt(listing.price).toLocaleString()} ₽
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {listing.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="gap-1">
                            <Icon name="ExternalLink" size={12} />
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2">
                          <Icon name="Eye" size={16} />
                          Просмотры
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2">
                          <Icon name="Edit" size={16} />
                          Редактировать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="pricing" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Тарифы и цены</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Выберите подходящий тариф для вашего бизнеса
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle>Стартовый</CardTitle>
                    <CardDescription>Для частных продавцов</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">990₽</span>
                      <span className="text-muted-foreground">/месяц</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>До 10 объявлений</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>3 площадки</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Базовая статистика</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Email поддержка</span>
                      </li>
                    </ul>
                    <Button className="w-full">Выбрать</Button>
                  </CardContent>
                </Card>

                <Card className="hover-scale border-primary border-2 relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Популярный
                  </Badge>
                  <CardHeader>
                    <CardTitle>Профессионал</CardTitle>
                    <CardDescription>Для автосалонов</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">2990₽</span>
                      <span className="text-muted-foreground">/месяц</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>До 100 объявлений</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Массовая загрузка</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Шаблоны описаний</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Автопродление</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Расширенная статистика</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Приоритетная поддержка</span>
                      </li>
                    </ul>
                    <Button className="w-full">Выбрать</Button>
                  </CardContent>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle>Корпоративный</CardTitle>
                    <CardDescription>Для крупных компаний</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">9990₽</span>
                      <span className="text-muted-foreground">/месяц</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Безлимитные объявления</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Интеграция с CRM</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>API доступ</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Мультиаккаунт</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Персональный менеджер</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>24/7 поддержка</span>
                      </li>
                    </ul>
                    <Button className="w-full">Связаться</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="guide" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Инструкция по использованию</h2>
                <p className="text-muted-foreground">
                  Простое руководство за 4 шага
                </p>
              </div>

              <div className="space-y-8">
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        1
                      </div>
                      <div>
                        <CardTitle>Регистрация и подключение</CardTitle>
                        <CardDescription className="mt-2">
                          Создайте аккаунт в АвтоПост и подключите свои учетные записи на Авито, Дром и Авто.ру через безопасный API. Это займет не более 5 минут.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        2
                      </div>
                      <div>
                        <CardTitle>Создание объявления</CardTitle>
                        <CardDescription className="mt-2">
                          Заполните форму с данными автомобиля: марка, модель, год, пробег, цена, описание. Загрузите фотографии (до 20 штук). Используйте наши шаблоны для быстрого заполнения.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        3
                      </div>
                      <div>
                        <CardTitle>Автоматическая публикация</CardTitle>
                        <CardDescription className="mt-2">
                          Нажмите кнопку "Опубликовать" — объявление автоматически разместится на всех подключенных площадках. Система адаптирует форматы под требования каждой платформы.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        4
                      </div>
                      <div>
                        <CardTitle>Управление и аналитика</CardTitle>
                        <CardDescription className="mt-2">
                          Отслеживайте просмотры, звонки и сообщения в едином личном кабинете. Включите автопродление для постоянной видимости. Редактируйте объявления — изменения синхронизируются везде.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" className="gap-2 hover-scale" onClick={() => setActiveTab('create')}>
                  <Icon name="Rocket" size={20} />
                  Начать работу
                </Button>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="support" className="mt-0">
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Поддержка и контакты</h2>
                <p className="text-muted-foreground">
                  Мы всегда на связи, чтобы помочь вам
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Email поддержка</CardTitle>
                    <CardDescription className="mt-2">
                      support@autopost.ru<br />
                      Ответим в течение 24 часов
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Phone" size={24} className="text-accent" />
                    </div>
                    <CardTitle>Телефон</CardTitle>
                    <CardDescription className="mt-2">
                      +7 (495) 123-45-67<br />
                      Пн-Пт: 9:00 - 18:00 (МСК)
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Онлайн-чат</CardTitle>
                    <CardDescription className="mt-2">
                      Доступен в личном кабинете<br />
                      Мгновенные ответы на вопросы
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="FileText" size={24} className="text-accent" />
                    </div>
                    <CardTitle>База знаний</CardTitle>
                    <CardDescription className="mt-2">
                      Статьи и FAQ<br />
                      Ответы на частые вопросы
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Остались вопросы?</CardTitle>
                  <CardDescription>Отправьте нам сообщение, и мы свяжемся с вами</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Имя</Label>
                      <Input id="contact-name" placeholder="Ваше имя" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <Textarea id="contact-message" rows={5} placeholder="Опишите ваш вопрос..." />
                    </div>
                    <Button type="submit" className="gap-2">
                      <Icon name="Send" size={18} />
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" size={28} className="text-primary" />
                <span className="font-bold text-xl">АвтоПост</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Современный сервис для размещения автообъявлений на всех площадках одновременно
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Возможности</li>
                <li>Тарифы</li>
                <li>Интеграции</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Инструкция</li>
                <li>База знаний</li>
                <li>Контакты</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Блог</li>
                <li>Вакансии</li>
                <li>Партнеры</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 АвтоПост. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
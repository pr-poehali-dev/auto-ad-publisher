import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TabsContent } from '@/components/ui/tabs';
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

interface AppTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: {
    brand: string;
    model: string;
    year: string;
    mileage: string;
    price: string;
    description: string;
  };
  setFormData: (data: any) => void;
  photos: string[];
  setPhotos: (photos: string[]) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  listings: CarListing[];
  templates: Template[];
  applyTemplate: (template: Template) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  removePhoto: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setIsChatOpen: (open: boolean) => void;
}

export const AppTabs = ({
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  photos,
  setPhotos,
  isDragging,
  setIsDragging,
  listings,
  templates,
  applyTemplate,
  handlePhotoUpload,
  handleDrop,
  removePhoto,
  handleSubmit,
  setIsChatOpen
}: AppTabsProps) => {
  return (
    <>
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
                      <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Перетащите фото или нажмите для выбора</p>
                      <p className="text-sm text-muted-foreground mb-4">PNG, JPG до 10MB каждый</p>
                      <Button type="button" variant="outline" onClick={() => document.getElementById('photos')?.click()}>
                        Выбрать файлы
                      </Button>
                      <p className="text-sm text-muted-foreground mt-3">
                        Загружено: {photos.length} / 20
                      </p>
                    </div>

                    {photos.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Icon name="X" size={16} />
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

            {listings.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Inbox" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Пока нет объявлений</h3>
                <p className="text-muted-foreground mb-6">
                  Создайте первое объявление и начните продавать
                </p>
                <Button onClick={() => setActiveTab('create')} className="gap-2">
                  <Icon name="Plus" size={18} />
                  Создать объявление
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover-scale">
                    <div className="aspect-video bg-muted relative">
                      {listing.photos[0] ? (
                        <img src={listing.photos[0]} alt={`${listing.brand} ${listing.model}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Car" size={48} className="text-muted-foreground" />
                        </div>
                      )}
                      <Badge className={`absolute top-2 right-2 ${
                        listing.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {listing.status === 'active' ? 'Активно' : 'На модерации'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">
                        {listing.brand} {listing.model}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {parseInt(listing.price).toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="text-sm text-muted-foreground mb-3">
                        {listing.year} г. • {parseInt(listing.mileage).toLocaleString('ru-RU')} км
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {listing.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-2"
                          onClick={() => toast.info(`Просмотров: ${Math.floor(Math.random() * 500) + 50}`)}
                        >
                          <Icon name="Eye" size={16} />
                          Просмотры
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-2"
                          onClick={() => {
                            setActiveTab('create');
                            toast.info('Открыта форма редактирования');
                          }}
                        >
                          <Icon name="Edit" size={16} />
                          Редактировать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
                  <Button className="w-full" onClick={() => toast.success('Выбран тариф "Стартовый"')}>Выбрать</Button>
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
                  <Button className="w-full" onClick={() => toast.success('Выбран тариф "Профессионал"')}>Выбрать</Button>
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
                  <Button className="w-full" onClick={() => {
                    setActiveTab('support');
                    toast.info('Переходим к форме связи');
                  }}>Связаться</Button>
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
                    yaer5hov@yandex.ru<br />
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
                    +7 915 321 88 71<br />
                    Пн-Пт: 9:00 - 18:00 (МСК)
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale cursor-pointer" onClick={() => setIsChatOpen(true)}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Онлайн-чат</CardTitle>
                  <CardDescription className="mt-2">
                    Мгновенные ответы на вопросы<br />
                    Нажмите, чтобы начать диалог
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-scale cursor-pointer" onClick={() => setActiveTab('knowledge')}>
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
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" rows={5} placeholder="Опишите ваш вопрос..." required />
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

      <TabsContent value="knowledge" className="mt-0">
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">База знаний</h2>
              <p className="text-muted-foreground">
                Ответы на частые вопросы о работе с платформой
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Как создать объявление?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Нажмите кнопку "Создать объявление", заполните форму с данными автомобиля 
                    (марка, модель, год, пробег, цена), добавьте описание и загрузите фотографии. 
                    После нажатия "Опубликовать" объявление автоматически размещается на Авито, Дром и Авто.ру.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Какие тарифы доступны?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground space-y-2">
                    <p><strong>Стартовый (990₽/мес)</strong> — до 10 объявлений, базовая статистика</p>
                    <p><strong>Профессионал (2990₽/мес)</strong> — до 100 объявлений, шаблоны, автопродление</p>
                    <p><strong>Корпоративный (9990₽/мес)</strong> — безлимит, интеграция с CRM, API доступ</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Как работают шаблоны описаний?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    В разделе "Шаблоны" выберите готовый шаблон описания (седан, внедорожник, компактный и др.). 
                    При создании объявления нажмите на шаблон — текст автоматически подставится в поле описания. 
                    Вы можете отредактировать его под конкретный автомобиль.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Как загружать фотографии?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    При создании объявления перетащите фото в зону загрузки или нажмите "Выбрать файлы". 
                    Максимум 20 фотографий на объявление. Рекомендуемые форматы: JPG, PNG. 
                    Первое фото станет главным в объявлении.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Что такое автопродление?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Автопродление автоматически поднимает ваши объявления в топ выдачи на площадках 
                    каждые 24 часа. Это увеличивает количество просмотров и ускоряет продажу. 
                    Функция доступна в тарифах "Профессионал" и "Корпоративный".
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Как отслеживать статистику?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    В разделе "Мои объявления" под каждым объявлением отображается количество 
                    просмотров по каждой площадке. В тарифах "Профессионал" и "Корпоративный" 
                    доступна расширенная аналитика: графики просмотров, конверсия, источники трафика.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Как изменить или удалить объявление?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Откройте "Мои объявления", нажмите на нужное объявление. Вы увидите кнопки 
                    "Редактировать" и "Удалить". После редактирования изменения автоматически 
                    применяются на всех площадках в течение 5-10 минут.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    Нужна ли интеграция с площадками?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Да, для автоматической публикации нужно подключить API-ключи от Авито, Дром и Авто.ру. 
                    Инструкция по получению ключей доступна в личном кабинете в разделе "Настройки" → "Интеграции". 
                    Это одноразовая настройка, занимает 5-10 минут.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Не нашли ответ на свой вопрос?
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={() => setIsChatOpen(true)} className="gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Спросить в чате
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('support')} className="gap-2">
                  <Icon name="Mail" size={18} />
                  Написать в поддержку
                </Button>
              </div>
            </div>
          </div>
        </section>
      </TabsContent>
    </>
  );
};
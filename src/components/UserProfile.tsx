import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface UserProfileProps {
  userId: string;
  onClose: () => void;
}

interface ProfileData {
  username: string;
  phone: string;
  avito_profile_url?: string;
  drom_profile_url?: string;
  autoru_profile_url?: string;
  created_at: string;
  stats: {
    total_listings: number;
    active_listings: number;
    pending_listings: number;
  };
}

export const UserProfile = ({ userId, onClose }: UserProfileProps) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [avitoUrl, setAvitoUrl] = useState('');
  const [dromUrl, setDromUrl] = useState('');
  const [autoruUrl, setAutoruUrl] = useState('');

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5ee349e8-dabb-44ef-a667-448141401e5b', {
        headers: {
          'X-User-Id': userId
        }
      });

      const data = await response.json();
      if (data.success && data.profile) {
        setProfile(data.profile);
        setAvitoUrl(data.profile.avito_profile_url || '');
        setDromUrl(data.profile.drom_profile_url || '');
        setAutoruUrl(data.profile.autoru_profile_url || '');
      }
    } catch (error) {
      toast.error('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/5ee349e8-dabb-44ef-a667-448141401e5b', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          avito_profile_url: avitoUrl,
          drom_profile_url: dromUrl,
          autoru_profile_url: autoruUrl
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Профиль обновлен');
        setEditing(false);
        await loadProfile();
      }
    } catch (error) {
      toast.error('Ошибка сохранения профиля');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile?.username}</h2>
            <p className="text-sm text-muted-foreground">{profile?.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{profile?.stats.total_listings || 0}</div>
            <div className="text-sm text-muted-foreground">Всего объявлений</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{profile?.stats.active_listings || 0}</div>
            <div className="text-sm text-muted-foreground">Активных</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{profile?.stats.pending_listings || 0}</div>
            <div className="text-sm text-muted-foreground">В ожидании</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Профили на площадках</h3>
            {!editing && (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="avito">Авито</Label>
                <Input
                  id="avito"
                  type="url"
                  value={avitoUrl}
                  onChange={(e) => setAvitoUrl(e.target.value)}
                  placeholder="https://www.avito.ru/user/..."
                />
              </div>
              <div>
                <Label htmlFor="drom">Дром</Label>
                <Input
                  id="drom"
                  type="url"
                  value={dromUrl}
                  onChange={(e) => setDromUrl(e.target.value)}
                  placeholder="https://auto.drom.ru/..."
                />
              </div>
              <div>
                <Label htmlFor="autoru">Авто.ру</Label>
                <Input
                  id="autoru"
                  type="url"
                  value={autoruUrl}
                  onChange={(e) => setAutoruUrl(e.target.value)}
                  placeholder="https://auto.ru/..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={loading}>
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => {
                  setEditing(false);
                  setAvitoUrl(profile?.avito_profile_url || '');
                  setDromUrl(profile?.drom_profile_url || '');
                  setAutoruUrl(profile?.autoru_profile_url || '');
                }}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {profile?.avito_profile_url ? (
                <a
                  href={profile.avito_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon name="ExternalLink" size={20} className="text-primary" />
                  <div>
                    <div className="font-medium">Авито</div>
                    <div className="text-sm text-muted-foreground truncate">{profile.avito_profile_url}</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 border rounded-lg text-muted-foreground">
                  <Icon name="Link" size={20} />
                  <div className="text-sm">Профиль Авито не указан</div>
                </div>
              )}

              {profile?.drom_profile_url ? (
                <a
                  href={profile.drom_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon name="ExternalLink" size={20} className="text-primary" />
                  <div>
                    <div className="font-medium">Дром</div>
                    <div className="text-sm text-muted-foreground truncate">{profile.drom_profile_url}</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 border rounded-lg text-muted-foreground">
                  <Icon name="Link" size={20} />
                  <div className="text-sm">Профиль Дром не указан</div>
                </div>
              )}

              {profile?.autoru_profile_url ? (
                <a
                  href={profile.autoru_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon name="ExternalLink" size={20} className="text-primary" />
                  <div>
                    <div className="font-medium">Авто.ру</div>
                    <div className="text-sm text-muted-foreground truncate">{profile.autoru_profile_url}</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 border rounded-lg text-muted-foreground">
                  <Icon name="Link" size={20} />
                  <div className="text-sm">Профиль Авто.ру не указан</div>
                </div>
              )}
            </div>
          )}
        </div>

        {profile?.created_at && (
          <div className="text-sm text-muted-foreground text-center">
            Аккаунт создан: {new Date(profile.created_at).toLocaleDateString('ru-RU')}
          </div>
        )}
      </div>
    </div>
  );
};

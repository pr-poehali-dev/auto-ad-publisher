import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (userId: string, username: string) => void;
}

export const AuthModal = ({ onClose, onSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/551a0343-b69f-44fb-8422-bf6d7c8b59dc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Произошла ошибка');
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        onSuccess(data.user_id, data.username);
        onClose();
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <Icon name="X" size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Нет аккаунта?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className="text-primary hover:underline"
              >
                Зарегистрируйтесь
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className="text-primary hover:underline"
              >
                Войдите
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

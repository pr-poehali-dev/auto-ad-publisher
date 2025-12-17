-- Добавляем телефон пользователя
ALTER TABLE t_p69695632_auto_ad_publisher.users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Добавляем ссылки на профили пользователей на площадках
ALTER TABLE t_p69695632_auto_ad_publisher.users 
ADD COLUMN IF NOT EXISTS avito_profile_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS drom_profile_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS autoru_profile_url VARCHAR(500);
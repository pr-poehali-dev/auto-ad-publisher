-- Создаем таблицу пользователей
CREATE TABLE IF NOT EXISTS t_p69695632_auto_ad_publisher.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем колонку user_id в таблицу listings
ALTER TABLE t_p69695632_auto_ad_publisher.listings 
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES t_p69695632_auto_ad_publisher.users(id);

-- Создаем индекс для быстрого поиска объявлений по пользователю
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON t_p69695632_auto_ad_publisher.listings(user_id);
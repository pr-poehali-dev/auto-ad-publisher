-- Таблица для хранения объявлений об автомобилях
CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    listing_id VARCHAR(100) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    mileage VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    platforms JSONB DEFAULT '[]'::jsonb,
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индекс для быстрого поиска по listing_id
CREATE INDEX IF NOT EXISTS idx_listings_listing_id ON listings(listing_id);

-- Индекс для сортировки по дате создания
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);

COMMENT ON TABLE listings IS 'Объявления о продаже автомобилей';
COMMENT ON COLUMN listings.listing_id IS 'Уникальный идентификатор объявления';
COMMENT ON COLUMN listings.status IS 'Статус: active, pending, expired';
COMMENT ON COLUMN listings.platforms IS 'JSON массив площадок публикации';
COMMENT ON COLUMN listings.photos IS 'JSON массив URL фотографий';
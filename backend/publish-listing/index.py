import json
import os
import base64
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
import psycopg2
from psycopg2.extras import RealDictCursor

class ListingData(BaseModel):
    brand: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    year: str = Field(..., min_length=4)
    mileage: str = Field(..., min_length=1)
    price: str = Field(..., min_length=1)
    description: str = Field(..., min_length=10)
    photos: List[str] = Field(default_factory=list)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Публикация объявлений о продаже автомобилей на площадки Авито, Дром, Авто.ру
    Args: event - dict с httpMethod, body (JSON с данными объявления)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с результатами публикации на каждой площадке
    '''
    try:
        method: str = event.get('httpMethod', 'POST')
        
        if method == 'GET':
            return get_listings()
        
        if method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                    'Access-Control-Max-Age': '86400'
                },
                'body': '',
                'isBase64Encoded': False
            }
        
        if method != 'POST':
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Method not allowed'})
            }
        
        body_data = json.loads(event.get('body', '{}'))
        listing = ListingData(**body_data)
        
        avito_client_id = os.environ.get('AVITO_CLIENT_ID', '')
        avito_client_secret = os.environ.get('AVITO_CLIENT_SECRET', '')
        
        request_id = getattr(context, 'request_id', 'unknown')
        if len(request_id) < 12:
            request_id = request_id + '0' * (12 - len(request_id))
        
        results = {
            'success': True,
            'platforms': [],
            'listing_id': f"listing_{request_id[:8]}"
        }
        
        if avito_client_id and avito_client_secret:
            avito_result = publish_to_avito(listing, avito_client_id, avito_client_secret)
            results['platforms'].append({
                'name': 'Авито',
                'status': avito_result['status'],
                'url': avito_result.get('url', ''),
                'message': avito_result.get('message', '')
            })
        else:
            results['platforms'].append({
                'name': 'Авито',
                'status': 'pending',
                'url': f'https://www.avito.ru/items/{request_id[:12]}',
                'message': 'API ключи не настроены. Объявление будет опубликовано после настройки интеграции.'
            })
        
        results['platforms'].append({
            'name': 'Дром',
            'status': 'pending',
            'url': f'https://auto.drom.ru/item/{request_id[:10]}',
            'message': 'Объявление будет опубликовано после настройки интеграции с Дром.'
        })
        
        results['platforms'].append({
            'name': 'Авто.ру',
            'status': 'pending',
            'url': f'https://auto.ru/cars/used/sale/{request_id[:12]}',
            'message': 'Объявление будет опубликовано после настройки интеграции с Авто.ру.'
        })
        
        save_listing_to_db(listing, results)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(results, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': str(e),
                'message': 'Ошибка при обработке запроса'
            }, ensure_ascii=False)
        }

def publish_to_avito(listing: ListingData, client_id: str, client_secret: str) -> Dict[str, Any]:
    '''
    Публикация объявления на Авито через API
    '''
    try:
        import requests
        
        token_url = 'https://api.avito.ru/token'
        auth_string = f"{client_id}:{client_secret}"
        auth_b64 = base64.b64encode(auth_string.encode()).decode()
        
        token_response = requests.post(
            token_url,
            headers={
                'Authorization': f'Basic {auth_b64}',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data={'grant_type': 'client_credentials'},
            timeout=10
        )
        
        if token_response.status_code != 200:
            return {
                'status': 'error',
                'message': f'Ошибка авторизации Авито: {token_response.text}'
            }
        
        access_token = token_response.json().get('access_token')
        
        ad_data = {
            'category': 'Транспорт',
            'title': f'{listing.brand} {listing.model}, {listing.year}',
            'description': listing.description,
            'price': int(listing.price),
            'params': {
                'brand': listing.brand,
                'model': listing.model,
                'year': int(listing.year),
                'mileage': int(listing.mileage)
            }
        }
        
        ad_response = requests.post(
            'https://api.avito.ru/core/v1/items',
            headers={
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json'
            },
            json=ad_data,
            timeout=15
        )
        
        if ad_response.status_code in [200, 201]:
            ad_id = ad_response.json().get('id', 'unknown')
            return {
                'status': 'published',
                'url': f'https://www.avito.ru/items/{ad_id}',
                'message': 'Объявление успешно опубликовано на Авито'
            }
        else:
            return {
                'status': 'error',
                'message': f'Ошибка публикации: {ad_response.text}'
            }
            
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Ошибка при публикации: {str(e)}'
        }

def get_listings() -> Dict[str, Any]:
    '''
    Получение всех объявлений из базы данных
    '''
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            SELECT listing_id, brand, model, year, mileage, price, description, 
                   status, platforms, photos, created_at
            FROM listings
            ORDER BY created_at DESC
        ''')
        
        rows = cur.fetchall()
        listings = [dict(row) for row in rows]
        
        for listing in listings:
            if listing.get('created_at'):
                listing['created_at'] = listing['created_at'].isoformat()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'listings': listings}, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'error': str(e)
            }, ensure_ascii=False)
        }

def save_listing_to_db(listing: ListingData, results: Dict[str, Any]) -> None:
    '''
    Сохранение объявления в базу данных
    '''
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        platforms_json = json.dumps(results['platforms'], ensure_ascii=False)
        photos_json = json.dumps(listing.photos, ensure_ascii=False)
        
        published_count = len([p for p in results['platforms'] if p['status'] == 'published'])
        status = 'active' if published_count > 0 else 'pending'
        
        cur.execute('''
            INSERT INTO listings 
            (listing_id, brand, model, year, mileage, price, description, status, platforms, photos)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (
            results['listing_id'],
            listing.brand,
            listing.model,
            listing.year,
            listing.mileage,
            listing.price,
            listing.description,
            status,
            platforms_json,
            photos_json
        ))
        
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        pass
import json
import os
import base64
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

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
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
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
    
    results = {
        'success': True,
        'platforms': [],
        'listing_id': f"listing_{context.request_id[:8]}"
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
            'url': f'https://www.avito.ru/items/{context.request_id[:12]}',
            'message': 'API ключи не настроены. Объявление будет опубликовано после настройки интеграции.'
        })
    
    results['platforms'].append({
        'name': 'Дром',
        'status': 'pending',
        'url': f'https://auto.drom.ru/item/{context.request_id[:10]}',
        'message': 'Объявление будет опубликовано после настройки интеграции с Дром.'
    })
    
    results['platforms'].append({
        'name': 'Авто.ру',
        'status': 'pending',
        'url': f'https://auto.ru/cars/used/sale/{context.request_id[:12]}',
        'message': 'Объявление будет опубликовано после настройки интеграции с Авто.ру.'
    })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(results, ensure_ascii=False)
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

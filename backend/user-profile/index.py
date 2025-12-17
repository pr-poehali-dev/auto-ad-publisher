import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение информации о профиле пользователя
    Args: event - словарь с httpMethod, headers (X-User-Id)
          context - объект с атрибутами запроса
    Returns: HTTP ответ с данными профиля пользователя
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Необходима авторизация'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cur.execute('''
                SELECT id, username, phone, avito_profile_url, drom_profile_url, autoru_profile_url, created_at
                FROM t_p69695632_auto_ad_publisher.users
                WHERE id = %s
            ''', (int(user_id),))
            
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                SELECT COUNT(*) as total,
                       COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
                       COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
                FROM t_p69695632_auto_ad_publisher.listings
                WHERE user_id = %s
            ''', (int(user_id),))
            
            stats = cur.fetchone()
            
            profile_data = dict(user)
            if profile_data.get('created_at'):
                profile_data['created_at'] = profile_data['created_at'].isoformat()
            
            profile_data['stats'] = {
                'total_listings': stats['total'] if stats else 0,
                'active_listings': stats['active'] if stats else 0,
                'pending_listings': stats['pending'] if stats else 0
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'profile': profile_data}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            avito_url = body_data.get('avito_profile_url', '').strip()
            drom_url = body_data.get('drom_profile_url', '').strip()
            autoru_url = body_data.get('autoru_profile_url', '').strip()
            
            cur.execute('''
                UPDATE t_p69695632_auto_ad_publisher.users
                SET avito_profile_url = %s,
                    drom_profile_url = %s,
                    autoru_profile_url = %s
                WHERE id = %s
            ''', (avito_url or None, drom_url or None, autoru_url or None, int(user_id)))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Профиль обновлен'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()

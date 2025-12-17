import json
import os
import psycopg2
import hashlib
import secrets
from typing import Dict, Any

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обрабатывает регистрацию и вход пользователей
    Args: event - словарь с httpMethod, body
          context - объект с атрибутами запроса
    Returns: HTTP ответ с токеном пользователя
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action')
    username = body_data.get('username', '').strip()
    password = body_data.get('password', '')
    
    if not username or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Введите имя пользователя и пароль'}),
            'isBase64Encoded': False
        }
    
    if len(username) < 3 or len(username) > 50:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя пользователя должно быть от 3 до 50 символов'}),
            'isBase64Encoded': False
        }
    
    if len(password) < 6:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        if action == 'register':
            password_hash = hash_password(password)
            
            cur.execute(
                "SELECT id FROM t_p69695632_auto_ad_publisher.users WHERE username = %s",
                (username,)
            )
            if cur.fetchone():
                return {
                    'statusCode': 409,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь с таким именем уже существует'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "INSERT INTO t_p69695632_auto_ad_publisher.users (username, password_hash) VALUES (%s, %s) RETURNING id",
                (username, password_hash)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            
            token = secrets.token_urlsafe(32)
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user_id': user_id,
                    'username': username,
                    'token': token
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'login':
            password_hash = hash_password(password)
            
            cur.execute(
                "SELECT id, username FROM t_p69695632_auto_ad_publisher.users WHERE username = %s AND password_hash = %s",
                (username, password_hash)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверное имя пользователя или пароль'}),
                    'isBase64Encoded': False
                }
            
            token = secrets.token_urlsafe(32)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user_id': user[0],
                    'username': user[1],
                    'token': token
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверное действие'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()

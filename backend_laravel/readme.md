# Backend RAM Tomar

## About
Backend developed using Laravel's micro-framework **Lumen**. 
Official documentation regarding **Lumen** can be found [here](https://lumen.laravel.com/docs/5.8/ "aqui").

## Run it by yourself
On the first time running the project you need to:

1. Clone this repo
2. Run `composer update`
3. Copy `.env.example` as `.env` and replace database information + APP_KEY (for encryption)
4. Run `php artisan jwt:secret` to generate jwt secret
5. Run `php artisan migrate`
6. Run `php artisan db:seed` to create first user (admin@admin.com - password)
7. Run `php -S localhost:8000 -t public` to locally deploy the application

## Basic documentation
##### Endpoints
\* => required
###### **POST** /api/login

Used to login user in the app

Request should contain the following fields on body:
- email (string) *
- password (string) *

Doesnt need auth

Returns: token
```json
    {
        "token": "eyJ(...supressed)",
        "token_type": "bearer",
        "expires_in": 3600
    }
```

###### **GET** /api/me

Requires auth:
`Authorization: Bearer *token*`

Returns 401 if auth fails or 200 with body:
```json
{
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@admin.com",
        "created_at": "2020-03-17 01:04:53",
        "updated_at": "2020-03-17 01:04:53"
    }
}
```

###### **GET** /api/users

Get all users by page

Requires auth:
`Authorization: Bearer *token*`

Returns 401 if auth fails or 200 with body:
```json
{
    "current_page": 1,
    "data": [
        {
            "id": 1,
            "name": "admin",
            "email": "admin@admin.com",
            "created_at": "2020-03-17 16:35:31",
            "updated_at": "2020-03-18 15:25:21"
        }
    ],
    "first_page_url": "http://localhost:8000/api/users?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://localhost:8000/api/users?page=1",
    "next_page_url": null,
    "path": "http://localhost:8000/api/users",
    "per_page": 15,
    "prev_page_url": null,
    "to": 1,
    "total": 1
}
```

###### **PATCH** /api/users/{id}

Update user.

Body request:
- email (string) 
- name (string)
- password (string)

Requires auth:
`Authorization: Bearer *token*`

Returns 401 if auth fails or 404 if user with "id" does not exist or 200 with body:
```json
{
    "user": {
        "id": 1,
        "name": "admin",
        "email": "admin@admin.com",
        "created_at": "2020-03-17 16:35:31",
        "updated_at": "2020-03-18 15:56:50"
    }
}
```

###### **POST** /api/users

Create new user.

Body request:
- email (string) *
- name (string) *
- password (string) *
- password_confirmation (string) *

Requires auth:
`Authorization: Bearer *token*`

Returns 401 if auth fails or 200 with body:
```json
{
    "user": {
        "email": "manel@manel.com",
        "name": "manel",
        "updated_at": "2020-03-18 16:00:24",
        "created_at": "2020-03-18 16:00:24",
        "id": 3
    }
}
```

###### **DELETE** /api/users

Delete user.

Requires auth:
`Authorization: Bearer *token*`

Returns 401 if auth fails or 404 if user with "id" does not exist or 200 with body:
```json
true
```

## Changelog

##### [2020-03-17]
- Installed framework **- Marcelo Silva**
- Installed jwt-auth package (Author: [tymon](https://github.com/tymondesigns/jwt-auth "tymon")) to handle user auth **- Marcelo Silva**
- Created base structure for routes file **- Marcelo Silva**
- Created route for login with step-by-step comment (for example and understanding of how the framework works) **- Marcelo Silva**
- Created simple route that needs auth to retrieve current user information (/api/me) **- Marcelo Silva**

##### [2020-03-18]
- Created endpoint to retrieve users  **- Francisco Vital**
- Created endpoint to edit user  **- Francisco Vital**
- Created endpoint to create new user  **- Francisco Vital**
- Created endpoint to delete user  **- Francisco Vital**
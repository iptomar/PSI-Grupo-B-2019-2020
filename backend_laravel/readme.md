# Backend RAM Tomar

## About
Backend developed using Laravel's micro-framework **Lumen**. 
Official documentation regarding **Lumen** can be found [here](https://lumen.laravel.com/docs/5.8/ "aqui").

## Run it by yourself
On the first time running the project you need to:

1. Clone this repo
2. Run `composer updated`
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

## Changelog

##### [2020-03-17]
- Installed framework** - Marcelo Silva**
- Installed jwt-auth package (Author: [tymon](https://github.com/tymondesigns/jwt-auth "tymon")) to handle user auth** - Marcelo Silva**
- Created base structure for routes file** - Marcelo Silva**
- Created route for login with step-by-step comment (for example and understanding of how the framework works)** - Marcelo Silva**
- Created simple route that needs auth to retrieve current user information (/api/me)** - Marcelo Silva**


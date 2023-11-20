# Как запустить проект

1. Прописываем .env из .env.example

1. Запускаем `docker-compose.yml`

```bash
docker compose -f "docker-compose.yml" up -d --build
```

3. Для запуска приложения, в контейнере нужно запустить `server.ts`

```bash
npm run dev
```

> [!NOTE]
> Приложение запуститься на http://localhost:5000/

# Пояснения к запросам из postman файла

конфигурация postman.json \
`./PostmanConfig.v2.1.json` \
`./PostmanConfig.v2.json` \
v2.1 и v2 - это версии экспорта postman

<!-- Оглавление -->

-   [Auth](#Auth)
    -   [Registration](#Registration)
    -   [Login](#Login)
-   [Restaurant](#Restaurant)
    -   [Restaurant Account](#Restaurant-Account)
        -   [Account](#Account)
        -   [Menu](#Menu)
        -   [Dish](#Dish)
        -   [Order](#Order)
    -   [Public Restaurant](#Public-Restaurant)
-   [User](#User)
    -   [Order](#User.Order)
    -   [Rating](#User.Rating)
-   [Courier](#Courier)
    -   [Courier Account](#Courier-Account)

## Auth

### Registration

role принимает 3 значения: User, Restaurant, Courier

#### Поля для User:

-   login
-   email
-   password
-   confirmPassword
-   role

#### Поля для Restaurant

-   name
-   login
-   email
-   password
-   confirmPassword
-   role

#### Поля для Courier

-   firstName
-   lastName
-   login, email
-   password
-   confirmPassword
-   role

### Login

role также принимает 3 значения: User, Restaurant, Courier
Если в базе есть данные об аккаунте, вам выдадут токен и информацию об аккаунте

> При регистрации и входе в аккаунт выдаётся токен, его нужно ввести для **Пользователя**, **Ресторана** и **Курьера** в разные группы в postman

> У **Пользователя** главный токен находиться во вкладке User \
> У **Ресторана** он находиться во вкладке Restaurants/Restaurant Account \
> У **Курьера** токен находиться во вкладке Courier/Courier Account

## Restaurant

#### All Restaurant

Показывает все рестораны

#### One Restaurant

Покажет ресторан по его логину (логин нужно ввести в строку поиска)

### Restaurant-Account

#### Account

##### Get Account

Выводит информацию об аккаунте

##### Update Account

Обновляет информацию об аккаунте
Принимает одно из значений:

-   name (Название ресторана)
-   description (Описание ресторана)
-   addresses (Адреса ресторанов)
-   contactInfo (Контактная информация ресторана)

> `addresses` принимает массив данных

**Пример**

```json
{
	"name": "McDonald's",
	"description": "An American corporation operating in the food service industry, the world's largest chain of fast food restaurants operating under a franchise system.",
	"addresses": ["Улица Некрасова дом 13", "Литейный проспект дом 17"],
	"contactInfo": "mcDonalds@production.com, 8-123-45-67-890"
}
```

##### Delete Restaurant

Удаляет аккаунт ресторана

### Menu

#### Get Menus

Показывает все меню ресторана

#### Get Menu

Показывает меню по id

#### Add Menu

Добавление меню
Принимает 2 поля: name, description
**Пример**

```json
{
	"name": "Стандартный завтрак",
	"description": "Описание блюда"
}
```

#### Delete Menu

Удаление блюда из ресторана по id, в строке поиска нужно ввести нужное id.

#### Add Dish To Menu

Добавляет блюдо по id. В строке поиска нужно написать id меню, а в body нужно указать id блюда - dish_id.
**Пример**

```json
{
	"dish_id": "655a60ede5858acd8307fedb"
}
```

#### Delete From Menu

Удаляет блюдо из меню. В строке поиска нужно написать id меню, после нужно написать id блюда.
**Пример**

|                         Строка                         |           Меню            |           Блюдо           |
| :----------------------------------------------------: | :-----------------------: | :-----------------------: |
| http://localhost:5000/account/restaurant/profile/menu/ | 655a5edec74870aecd96853d/ | 655a60ede5858acd8307fedb/ |

### Dish

#### Get Dishes

Показывает все блюда своего ресторана.

#### Get Dish

Показывает блюдо своего ресторана по id.

#### Add Dish

Добавление блюда. Принимает 4 поля: name, description, ingredients, price
**Пример**

```json
{
	"name": "Название блюда",
	"description": "Описание",
	"ingredients": ["Ингредиент 1", "Ингредиент 2", "Ингредиент 3"],
	"price": "12345"
}
```

> `ingredients` принимает массив данных

#### Delete Dish

Удаление блюда. Нужно прописать id блюда в строке поиска.

### Order

#### Get History Of Orders

Предоставляет историю заказов.

#### Get Active Orders

Показывает активные заказы.

#### Update Order

Обновляет статус заказа[^1]. Принимает 1 поле: `status`.

[^1]: У заказа есть 5 состояний: `active` (Активный), `isProcessed` (В обработке), `delivered` (Доставляется), `completed` (Законченный), `canceled` (Отменён). Статус заказа идёт от активного до завершённого или отменённого, ресторан может поменять статус `active` -> `isProcessed` -> `delivered`, также может отменить в любое время. Курьер может поменять статус `delivered` -> `completed` или отменить его. Пользователь может только отменить его.

**Пример**

```json
{
	"status": "isProcess"
}
```

### Public-Restaurant

Публичная страница ресторана, где видны все открытые меню и блюда

#### Get Menus

Показывает всё меню ресторана

#### Get Menu

Показывает меню по id

#### Get Dishes

Показывает все блюда

#### Get Dish

Показывает блюдо по id

## User

#### My Account

Покажет информацию об аккаунте пользователя

#### Add To Cart

Добавление блюда в корзину. Принимает два поля: dish_id и restaurant_id.
**Пример**

```json
{
	"dish_id": "6557ac109025f46ff7023f18",
	"restaurant_id": "655738616fd18fe4912d7247"
}
```

#### Delete Item From Cart

Удаляет блюдо из меню. Принимает два поля: dish_id и restaurant_id.
**Пример**

```json
{
	"dish_id": "6557ac109025f46ff7023f18",
	"restaurant_id": "655a5dafc74870aecd968527"
}
```

#### My Cart

Показывает все корзины пользователя[^2].

[^2]: У пользователя может быть несколько корзин, так как доставка может работать только из одного ресторана. К примеру, у нас есть ресторан А и ресторан Б, пользователь может набрать блюд в корзину из ресторана А и из Б, но заказ он может сделать либо из А или Б, так как курьер не может забрать заказ из разных ресторанов.

### User.Order

#### History

Показывает историю заказов пользователя.

##### Active

Показывает активные заказы из разных ресторанов.

#### Make Order

Создание заказа. Нужно указать одно поле: `restaurant_id` - id ресторана, с которым у пользователя есть корзина. \
**Пример**

```json
{
	"restaurant_id": "655738616fd18fe4912d7247"
}
```

#### Cancel Order

Отмена заказа. Для отмены нужно указать id ресторана, которого хотим отменить
**Пример**

```json
{
	"restaurant_id": "655738616fd18fe4912d7247"
}
```

### User.Rating

#### Rating.Restaurant

Оценка ресторана. Чтобы поставить оценку, нужно указать id ресторана и желаемый рейтинг от 1 до 10.
**Пример**

```json
{
	"restaurant_id": "655a693d976e05e83fbb4d45",
	"rating": 4
}
```

#### Rating.Courier

Оценка курьера. Чтобы поставить оценку, нужно указать id курьера и желаемый рейтинг от 1 до 10.
**Пример**

```json
{
	"courier_id": "6558e7fa34e826bac06c2e36",
	"rating": 7
}
```

## Courier

#### Get One Courier

Показывает курьера по логину, который нужно ввести в строку поиска.

### Courier-Account

#### Profile

Показывает свой профиль курьера.

#### Get Active Orders

Показывает все активные заказы, которые можно взять.

#### Get Active Order

Покажет свой активный заказ.

#### Take Order

Взятие заказа. Нужно написать id доступного для транспортировки заказа.
**Пример**

```json
{
	"order_id": "6557482778515a74f6e032d4"
}
```

#### Update Status Order

Обновление статуса заказа. Нужно написать статус заказа[^1]: `complated` (завершён), `canceled` (отменён).
**Пример**

```json
{
	"status": "canceled"
}
```

#### Get History Orders

Показывает историю заказов.

#### Get History Order

Показывает один заказ из истории по id, который нужно вписать в строку поиска.

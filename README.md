# Trello Clone ru

Это клон Trello, разработанный с использованием **Django Rest Framework**, **React**, **Redis** и **SASS**. Этот проект предоставляет функционал, схожий с Trello, для управления задачами, командами и проектами.

---

## Основные возможности
### Пользователи:
- Регистрация и вход:
  - Поддержка JWT-аутентификации для соединения Django Rest Framework и React.
  - Возможность входа с использованием имени пользователя или электронной почты.

### Проекты:
- Создание и управление проектами.
- Приглашение участников с помощью одноразовых ссылок.
- Настройка прав доступа участников:
  - **Администратор:** может редактировать проект, приглашать новых участников и менять права доступа.
  - **Обычный пользователь:** доступ только для чтения/добавления задач.

### Доски:
- Создание досок (личных или привязанных к проектам).
- Управление задачами:
  - Добавление карточек, списков и комментариев.
  - Упорядочивание карточек и списков с помощью drag-and-drop.
  - Добавление вложений, меток и участников к карточкам.
- Отображение недавно просмотренных и избранных досок.
- Интеграция с API **Unsplash** для установки фоновых изображений.

### Поиск:
- Быстрый поиск с автозавершением.

---

## Технологический стек
- **Backend:** Django, Django Rest Framework, Redis.
- **Frontend:** React, SASS.
- **База данных:** SQLite (может быть заменена на PostgreSQL или MySQL).
- **Кэширование:** Redis.

---

## Установка и запуск

### Backend
1. Перейдите в папку `backend`:
   ```bash
   cd backend
   ```
2. Установите зависимости с помощью `pipenv`:
   ```bash
   pipenv install
   ```
3. Запустите миграции базы данных:
   ```bash
   python manage.py migrate
   ```
4. Запустите сервер разработки:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Перейдите в папку `frontend`:
   ```bash
   cd frontend
   ```
2. Установите зависимости:
   ```bash
   yarn install
   ```
3. Запустите сервер разработки:
   ```bash
   yarn start
   ```
4. Создайте файл .env и внесите туда Access key полученный на сайте Unsplash developers
   ```.env
   REACT_APP_UNSPLASH_API_ACCESS_KEY=your_key
   ```


---

## API
Проект предоставляет RESTful API для работы с досками, задачами, проектами и пользователями. Основные маршруты:
- **/api/users/**: регистрация и управление пользователями.
- **/api/boards/**: создание и управление досками.
- **/api/projects/**: управление проектами.
- **/api/items/**: добавление и изменение карточек.

Документация API может быть расширена с использованием **Swagger** или **Postman**.

---

## Участие в разработке
Если вы хотите внести вклад:
1. Форкните репозиторий.
2. Создайте новую ветку:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Внесите изменения и сделайте коммит:
   ```bash
   git commit -m "Добавлена новая функциональность"
   ```
4. Отправьте изменения:
   ```bash
   git push origin feature/my-feature
   ```
5. Создайте pull request.

---

## Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле `LICENSE`.

---

## Контакты
Если у вас есть вопросы или предложения, напишите нам: [logip60@gmail.com].
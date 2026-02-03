# Форма управления учетными записями

Веб-приложение для управления учетными записями, построенное на Vue.js 3 с использованием Composition API, TypeScript, Pinia и Element Plus.

## Технологии

- **Vue.js 3** + Composition API
- **TypeScript**
- **Pinia** (state management)
- **Element Plus** (UI framework)
- **Vite** (build tool)

## Функциональность

- ✅ Добавление новых учетных записей
- ✅ Редактирование существующих записей
- ✅ Удаление учетных записей
- ✅ Два типа записей: LDAP и Локальная
- ✅ Условное отображение поля пароля (только для локальных записей)
- ✅ Валидация полей с визуальной индикацией ошибок
- ✅ Сохранение данных в localStorage (персистентность при перезагрузке страницы)
- ✅ Поддержка множественных меток через разделитель `;`

## Структура учетной записи

- **Метка** - Необязательное поле, максимум 50 символов. Несколько меток разделяются через `;`
- **Тип записи** - Выпадающий список: `LDAP` или `Локальная`
- **Логин** - Обязательное поле, максимум 100 символов
- **Пароль** - Обязательное поле для типа "Локальная", максимум 100 символов. Скрыто для типа "LDAP"

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Превью production сборки
npm run preview
```

## Структура проекта

```
src/
├── components/
│   └── accounts/
│       └── AccountsManager.vue  # Основной компонент формы
├── stores/
│   └── accounts.ts               # Pinia store для управления данными
├── types/
│   └── account.ts                # TypeScript типы
├── utils/
│   └── accountsStorage.ts        # Утилиты для работы с localStorage
├── App.vue                       # Корневой компонент
└── main.ts                       # Точка входа приложения
```

## Публикация на GitHub Pages

1. В репозитории откройте **Settings** → **Pages**.
2. В блоке **Build and deployment** в поле **Source** выберите **GitHub Actions**.
3. После пуша в ветку `main` workflow соберёт проект и задеплоит его. Сайт будет доступен по адресу:  
   `https://<USERNAME>.github.io/<REPO_NAME>/`

Если репозиторий называется `accounts-form`, ссылка будет:  
`https://<USERNAME>.github.io/accounts-form/`

**Если в браузере ошибка «Failed to load resource: 404» и в консоли фигурирует `main.ts`** — GitHub отдаёт исходный код, а не сборку. Подробная инструкция: [GITHUB-PAGES-SETUP.md](./GITHUB-PAGES-SETUP.md). Кратко: откройте [Settings → Pages](https://github.com/andreyyyb/accounts-form/settings/pages), в блоке **Build and deployment** в поле **Source** выберите **«GitHub Actions»** (не «Deploy from a branch»), затем во вкладке [Actions](https://github.com/andreyyyb/accounts-form/actions) запустите workflow «Deploy to GitHub Pages» и дождитесь зелёного статуса.

## Особенности реализации

- Валидация происходит при потере фокуса (blur) для текстовых полей и при изменении значения для select
- Метки преобразуются из строки в массив объектов `{ text: "..." }` при сохранении
- Данные сохраняются в localStorage и восстанавливаются при загрузке страницы
- Ошибки валидации отображаются красной обводкой полей

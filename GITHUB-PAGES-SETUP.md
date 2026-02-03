# Настройка GitHub Pages для accounts-form

## Если видите 404 на main.ts — делайте по шагам

### Шаг 1: Выбрать источник Pages

1. Откройте в браузере: **https://github.com/andreyyyb/accounts-form/settings/pages**
2. Прокрутите до блока **«Build and deployment»**.
3. Под заголовком **«Source»** сейчас может быть выбрано **«Deploy from a branch»** и ветка (например main).
4. Нажмите на выпадающий список **Source** и выберите **«GitHub Actions»** (одна строка в списке, не ветка).
5. После выбора блок с выбором ветки и папки исчезнет — это нормально.

### Шаг 2: Запустить деплой

1. Откройте: **https://github.com/andreyyyb/accounts-form/actions**
2. Слева выберите workflow **«Deploy to GitHub Pages»**.
3. Если последний запуск красный (failed) или его нет — нажмите **«Run workflow»** справа, затем зелёную кнопку **«Run workflow»** в выпадающем окне.
4. Дождитесь зелёной галочки у последнего запуска (1–3 минуты).

### Шаг 3: Открыть сайт

1. Откройте: **https://andreyyyb.github.io/accounts-form/** (обязательно со слэшем в конце).
2. Нажмите **Ctrl+Shift+R** (или Ctrl+F5) для обновления без кэша.

---

**Как проверить, что источник — GitHub Actions:**  
Откройте https://andreyyyb.github.io/accounts-form/ — в исходном коде страницы (ПКМ → «Просмотреть код страницы») не должно быть строки `src="/src/main.ts"`. Должна быть строка вида `src="./assets/index-xxxxx.js"`.

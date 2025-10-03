# Примеры интеграции OpenRouter API

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-API-green.svg)](https://openrouter.ai)

Этот репозиторий содержит примеры интеграции OpenRouter API на разных языках программирования. Проекты созданы для демонстрации в YouTube видео и показывают, как легко работать с современными AI-моделями через OpenRouter.

## 📁 Содержание проекта

### 🐍 Python пример: "Поэтический AI"
**Файл:** `poetic_ai.py`

Интерактивный чат-бот, который отвечает на любые вопросы в форме коротких стихотворений.

**Особенности:**
- Использует модель `deepseek/deepseek-chat-v3.1:free`
- Ответы в поэтической форме (2-4 строки)
- Простой консольный интерфейс
- Обработка ошибок

**Запуск:**
```bash
python poetic_ai.py
```

### 🌐 JavaScript пример: "Web Chat"
**Файлы:** `index.html`, `script.js`, `style.css`

Веб-приложение чата с красивым интерфейсом для общения с AI.

**Особенности:**
- Сохранение API ключа в LocalStorage
- Анимация набора текста
- Адаптивный дизайн
- Обработка ошибок API

**Запуск:**
```bash
# Просто откройте index.html в браузере
open index.html
```

## ⚙️ Настройка

### 1. Получение API ключа
1. Зарегистрируйтесь на [OpenRouter](https://openrouter.ai)
2. Перейдите в [настройки API Keys](https://openrouter.ai/keys)
3. Создайте новый ключ (бесплатно)
4. Скопируйте ваш `Bearer` токен

### 2. Установка ключа

**Для Python примера:**
Замените строку в коде:
```python
"Authorization": "Bearer YOUR_ACTUAL_API_KEY_HERE"
```

**Для JavaScript примера:**
Введите ключ в поле ввода в интерфейсе приложения

## 🚀 Быстрый старт

### Python
```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/openrouter-examples.git
cd openrouter-examples

# Запустите Python пример
python poetic_ai.py
```

### JavaScript
```bash
# Откройте HTML файл в браузере
# Или используйте Live Server в VS Code
```

## 📋 Требования

### Python
- Python 3.8+
- Библиотека `requests`
```bash
pip install requests
```

### JavaScript
- Современный браузер с поддержкой ES6+
- Доступ к интернету

## 🔧 Конфигурация

### Доступные модели через OpenRouter
- `deepseek/deepseek-chat-v3.1:free` (бесплатная)
- `meta-llama/llama-3.1-8b-instruct:free`
- `google/gemini-flash-1.5:free`
- И многие другие...

### Параметры API
Вы можете настроить:
- `temperature` (0.1-2.0) - креативность ответов
- `max_tokens` - максимальная длина ответа
- `model` - выбор AI модели

## 🛠️ Использование в своих проектах

### Базовая структура запроса Python
```python
import requests
import json

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    data=json.dumps({
        "model": "deepseek/deepseek-chat-v3.1:free",
        "messages": [
            {"role": "user", "content": "Ваш вопрос"}
        ]
    })
)
```

### Базовая структура запроса JavaScript
```javascript
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
            {role: "user", content: message}
        ]
    })
});
```

## 🤝 Contributing

Приветствуются улучшения и дополнительные примеры! Не стесняйтесь создавать pull requests.

## ⚠️ Важные заметки

- **Никогда не публикуйте свои API ключи** в открытом доступе
- Используйте переменные окружения для хранения ключей
- Бесплатные модели имеют ограничения по использованию
- OpenRouter предоставляет доступ ко многим моделям через единый API

## 📞 Поддержка

- [Документация OpenRouter](https://openrouter.ai/docs)
- [Список доступных моделей](https://openrouter.ai/models)

## 📝 Лицензия

MIT License - свободное использование для любых целей.

---

*Создано для демонстрации в YouTube видео о интеграции OpenRouter API*

- [Ссылка на ролик](https://youtu.be/vGTdZN1UhDw)


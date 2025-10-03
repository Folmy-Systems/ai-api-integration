import requests
import json

def poetic_ai():
    print("🎭 Поэтический AI готов к диалогу! (для выхода введите 'exit')")
    
    while True:
        user_input = input("\nВаш вопрос: ").strip()
        
        if user_input.lower() == 'exit':
            print("До новых встреч!")
            break
            
        if not user_input:
            print("Введите вопрос...")
            continue

        try:
            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": "Bearer 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",  # Замените на ваш ключ
                    "Content-Type": "application/json"
                },
                data=json.dumps({
                    "model": "deepseek/deepseek-chat-v3.1:free",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Ты — поэт-философ. Отвечай на любой вопрос в форме короткого стихотворения (2-4 строки). Сохраняй глубину смысла, но используй изящные литературные образы."
                        },
                        {
                            "role": "user",
                            "content": user_input
                        }
                    ],
                    "temperature": 0.8
                })
            )
            
            if response.status_code == 200:
                poem = response.json()['choices'][0]['message']['content']
                print("\n🎭 Ответ AI:\n" + "-"*40)
                print(poem)
                print("-"*40)
            else:
                print(f"Ошибка API: {response.status_code}")

        except Exception as e:
            print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    poetic_ai()
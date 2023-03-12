import openai
import sys

# Установка API ключа
openai.api_key = "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"

# Отправка запроса
def generate_text(prompt):
    model_engine = "text-davinci-003" # модель для генерации текста
    response = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    # Получение ответа
    message = response.choices[0].text.strip()
    return message

# Получение входных данных и отправка ответа
for line in sys.stdin:
    prompt = line.strip()
    output = generate_text(prompt)
    sys.stdout.write(output + '\n')

import pyodbc
import json

# Подключение к базе данных
connection = pyodbc.connect('DRIVER={SQL Server};Server=DESKTOP-3K4K4AR;Database=Hakaton')
# Создание курсора
cursor = connection.cursor()

# Выполнение запроса
cursor.execute("SELECT Фамилия, Имя, Отчество, Специальность, дата_приема, время_начала FROM Врачи, расписание WHERE Занят = 0")

# Получение результатов запроса
results = cursor.fetchall()

# Преобразование результатов в список словарей
rows = [dict(zip([column[0] for column in cursor.description], row)) for row in results]

# Вывод результатов в формате JSON
print(json.dumps(rows))

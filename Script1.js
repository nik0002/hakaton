const express = require('express');
const { spawn } = require('child_process');

const translate = require('node-google-translate-skidz');

const app = express();

const port = 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.get('/process-input', (req, res) => {
  const prompt = req.query.input;

// Выполнение перевода и запись результата в переменную

  // Создание процесса Python
  const pythonProcess = spawn('C:\\Program Files\\Python311\\python.exe', ['my_script.py']);

  const pythonProcess2 = spawn('C:\\Program Files\\Python311\\python.exe', ['pyod.py']);

  // Передача входных данных в Python и получение ответа
  translate({ text: prompt, source: 'ru', target: 'en' }, function(result) {
    const prompt_en = result.translation;
    pythonProcess.stdin.write(prompt_en);
    pythonProcess.stdin.end();
  });
  

  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    translate({ text: output, source: 'en', target: 'ru' }, function(result) {
      const output_ru = result.translation;
      res.send(output_ru);
      console.log(output_ru);
    });

    
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.send(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.get('/process1-input', (req, res) => {
  // Создание процесса Python
  const pythonProcess = spawn('C:\\Program Files\\Python311\\python.exe', ['pyod.py']);

  // Передача входных данных в Python и получение ответа
  pythonProcess.stdout.on('data', (data) => {
    // Преобразование ответа в объект JavaScript
    const response = JSON.parse(data);

    // Отправка ответа на страницу HTML в формате JSON
    res.json(response);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.send(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



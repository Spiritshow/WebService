const mysql = require('mysql')

//введены изменения{
const express = require('express');
const app = express();
const cors = require('cors')

// app.use(express.json());
app.use(cors())
//введены изменения}

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "WEB_service"
})

  //введены изменения{
    app.get('/data', (req, res) => {
        const query = 'SELECT * FROM Masters';
        conn.query(query, (error, results) => {
          if (error) {
            console.error('Ошибка выполнения запроса:', error);
            res.status(500).send('Ошибка сервера');
            return;
          }
          console.log("тест ",results)
          res.json(results);
        });

      });
      
      const port = process.env.PORT || 3001;
      app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
      });
  //введены изменения}


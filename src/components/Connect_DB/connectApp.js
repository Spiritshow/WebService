const mysql = require('mysql')
const bodyParser = require('body-parser')

//введены изменения{
const express = require('express');
const app = express();
const cors = require('cors')

// app.use(express.json());
app.use(cors())
app.use(bodyParser())
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

app.post('/data', (req, res) => {
  let data = [req.body.id, req.body.secondName, req.body.firstName, req.body.patronymic, req.body.phoneNumber, req.body.description, req.body.specializations, req.body.photo.file, req.body.quality, req.body.linkVK]
  const query = 'INSERT INTO `Masters`(`ID`, `SecondName`, `FirstName`, `Patronymic`, `PhoneNumber`, `Description`, `Specialization`, `Images`, `Quality`, `LinkVK`) VALUES (?,?,?,?,?,?,?,?,?,?)';
  conn.query(query, data, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log("тест ",results)
    console.log(req.body.photo.file)
    res.json(results);
  });
});   
      
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//введены изменения}


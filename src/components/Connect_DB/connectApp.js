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

app.get('/Offering', (req, res) => {
  const query = 'SELECT Offers.ID, Offers.IDClient, Offers.Header, Offers.DataRequest, Offers.Images, Offers.Address, Offers.DescriptionWorks, Offers.SpecialtyWork, clientele.SecondName, clientele.FirstName, clientele.Patronymic, clientele.PhoneNumber, clientele.TrustLevel FROM Offers INNER JOIN clientele ON Offers.IDClient = clientele.id;';
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

app.post('/login', (req,res) => {
  let log = [req.body.login, req.body.password];
  const query = 'SELECT * FROM Users';
  conn.query(query, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log("тест ",results)
    iden(results);
  });

  const iden = (dataLogins) =>{
    let flag = true;
    console.log(dataLogins)
    //Идентификация
    dataLogins.map((dataLogin) => {
      if(dataLogin.Login === log[0]){
        flag = false;
        // Аунтификация
        if(dataLogin.Password === log[1]){
          //отсылка id для пользователя "Авторизация"
          if (dataLogin.ID_Master) {
            console.log("Master")
            res.json({id: dataLogin.ID_Master, user: "Master"});
          }else{
            res.json({id: dataLogin.ID_clientele, user: "Client"});
          };
        }else{
          res.json("Неверный пароль");
        };
      };
    })
    if(flag){
      res.json("Неверный логин");
    }
    }
});

app.post('/dataMaster', (req,res) => {
  let id = req.body.id;
  const query = 'SELECT * FROM `Masters` WHERE ID = ?';
  conn.query(query, id, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log("тест ",results)
    res.json(results);
  });
});

app.post('/EditMaster', (req,res) => {
  let data = [req.body.firstName, req.body.secondName, req.body.patronymic, req.body.phoneNumber, req.body.description, req.body.specializations, req.body.photo.file, req.body.linkVK, req.body.id]
  const query = `UPDATE Masters SET SecondName = ?, FirstName = ?, Patronymic = ?, PhoneNumber = ?, Description = ?, Specialization = ?, Images = ?, LinkVK = ? WHERE ID = ?`;
  conn.query(query, data, (error, results) => {
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


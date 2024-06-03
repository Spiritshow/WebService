const mysql = require('mysql')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
//введены изменения{
const express = require('express');
const app = express();
const cors = require('cors')
app.use(fileUpload({
  createParentPath: true
}));

// app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
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

app.post('/OffersClient', (req, res) => {
  const IDClient = req.body.IDClient;
  console.log(IDClient);
  const query = 'SELECT Offers.ID, Offers.IDClient, Offers.Header, Offers.DataRequest, Offers.Images, Offers.Address, Offers.DescriptionWorks, Offers.SpecialtyWork, clientele.SecondName, clientele.FirstName, clientele.Patronymic, clientele.PhoneNumber, clientele.TrustLevel FROM Offers INNER JOIN clientele ON Offers.IDClient = clientele.id WHERE IDClient = ?;';
  conn.query(query, IDClient, (error, results) => {
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

  let data = [req.body.id, req.body.secondName, req.body.firstName, req.body.patronymic, req.body.phoneNumber, req.body.description, req.body.specializations, req.body.photo, req.body.quality, req.body.linkVK]
  let data1 = [req.body.secondName]
  let data2 = [ null, req.body.login, req.body.password, null]
  const query = 'INSERT INTO `Masters`(`ID`, `SecondName`, `FirstName`, `Patronymic`, `PhoneNumber`, `Description`, `Specialization`, `Images`, `Quality`, `LinkVK`) VALUES (?,?,?,?,?,?,?,?,?,?);';
  const query1 = 'SELECT ID FROM Masters WHERE SecondName = ?';
  const query2 = 'INSERT INTO Users (`ID`,`Login`,`Password`,`ID_Master`,`ID_clientele`) VALUES (?,?,?,LAST_INSERT_ID(),?);'
  conn.query(query, data, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
  });
  conn.query(query1, data1, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(results)
  });
  conn.query(query2, data2, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
  });
});   

app.post('/dataClient', (req, res) => {

  let data = [req.body.id, req.body.secondName, req.body.firstName, req.body.patronymic, req.body.phoneNumber, req.body.quality,]
  let data1 = [req.body.secondName]
  let data2 = [ null, req.body.login, req.body.password, null]
  const query = 'INSERT INTO `clientele`(`ID`, `SecondName`, `FirstName`, `Patronymic`, `PhoneNumber`, `TrustLevel`) VALUES (?,?,?,?,?,?);';
  const query1 = 'SELECT ID FROM clientele WHERE SecondName = ?';
  const query2 = 'INSERT INTO Users (`ID`,`Login`,`Password`,`ID_Master`,`ID_clientele`) VALUES (?,?,?,?,LAST_INSERT_ID());'
  conn.query(query, data, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
  });
  conn.query(query1, data1, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log(results)
    res.json(results)
  });
  conn.query(query2, data2, (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).send('Ошибка сервера');
      return;
    }
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
  let data = [req.body.firstName, req.body.secondName, req.body.patronymic, req.body.phoneNumber, req.body.description, req.body.specializations, req.body.photo, req.body.linkVK, req.body.id]
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

app.post('/update', (req, res) => {
  if(!req.files){
    return res.status(400).json({msg: 'No file uploaded'});
  }

  const file = req.files.file;
  
  if(!file) return res.json({error: 'Incorrect'});

  const newFileName = encodeURI(file.name);
  
  console.log(`${__dirname}/public/uploads/${newFileName}`);

  file.mv(`${__dirname}/public/uploads/${newFileName}`, err => {
    if(err){
        console.error(err);
        return res.status(500).send(err);
    }
    console.log('file was uploaded');
    console.log(`${__dirname}/public/uploads/${newFileName}`)
    console.log(`/uploads/${newFileName}`)
    res.json({
        fileName: file.name,
        filePath: `/uploads/${newFileName}`
    });
  });
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//введены изменения}


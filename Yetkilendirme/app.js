const express = require('express');
const app = express();
const path = require('path');
const upload = require('./helpers/multer');
require('dotenv').config();

//Database connection
const db= require('./config/db');
const {upload:aws_upload,fileList:aws_fileList,deleteFile:aws_delete,getFile:aws_getFile}= require('./config/aws');
//

//Middleware
app.use("/static",express.static(path.join(__dirname,"public")));

app.use(express.json());

//Routers
const authrouter = require('./routers/auth');




app.get('/download/:key', async (req, res) => {
  const { key } = req.params;
  const data = await aws_getFile(key);
  res.setHeader('Content-Disposition', `attachment; filename="${key}"`);
  data.pipe(res)
});//Bu bir dosya indirme örneğidir. Dosya indirildiğinde aws fonksiyonu çalışır ve dosya indirilir.


app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const filePath = req.file.path; // Dosya yolu
  aws_upload(filePath);
 res.send('File uploaded successfully');
});//Bu bir dosya ekleme örneğidir. Dosya yüklendiğinde aws fonksiyonu çalışır ve dosya yüklenir.


app.post('/delete', async (req, res) => {
  const { key } = req.body;
  const data = await aws_delete(key);
  res.send(data);
});//Bu bir dosya silme örneğidir. Dosya silindiğinde aws fonksiyonu çalışır ve dosya silinir.

app.get('/list', async (req, res) => {
  const data = await aws_fileList();
  res.send(data);
});

app.use('/',authrouter);

require('./helpers/send_SMS');

app.listen(process.env.PORT || 306, () => {
    console.log('MicroService Auth is running on port 306');
  });
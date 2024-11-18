const { S3Client, PutObjectCommand,ListObjectsV2Command,DeleteObjectCommand ,GetObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');  // Dosya sisteminden dosya okumak için


const client = new S3Client({region:process.env.AWS_REGION,
credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
  },
});

const upload = async function(filePath)  {

const fileContent = fs.readFileSync(filePath);  // Yüklemek istediğiniz dosya

const command = new PutObjectCommand({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: path.basename(filePath),
  Body: fileContent,
});


  try {
      const data = await client.send(command);
      console.log('File uploaded successfully', data);
    } catch (err) {
      console.error('Error uploading file', err);
    }finally{
      fs.unlinkSync(filePath);
    }

  }

const fileList = async function() {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket adınızı yazın
  };

  try {
    const data = await client.send(new ListObjectsV2Command(params));
    const fileNames = data.Contents.map((file) => file.Key); // Dosya isimlerini alıyoruz
    return fileNames;
  } catch (err) {
    console.error('Error listing objects:', err);
  }
}

const deleteFile = async function(Key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
  };

  try {
    const data = await client.send(new DeleteObjectCommand(params));
    console.log('File deleted successfully', data);
    return data;
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

const getFile = async function(Key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
  };

  try {
    const data = await client.send(new GetObjectCommand(params));
 
    return data.Body;
  } catch (err) {
    console.error('Error downloading file:', err);
  }
};

module.exports = {upload,fileList,deleteFile,getFile};
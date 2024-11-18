const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

async function send_SMS(sns,params) {
    const command = new PublishCommand(params);
    const message = await sns.send(command);
    return message;
}



// SMS Gönderim Fonksiyonu
const sendSMS = async (phoneNumber, message) => {
  try {
    const params = {
      Message: message, // SMS'in içeriği
      PhoneNumber: phoneNumber, // Alıcının telefon numarası (örnek: '+905xxxxxxxxx')
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          'DataType': 'String',
          'StringValue': 'String', // Gönderici adı
    
      }}};
    const sns = new SNSClient({ region:process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
        }
     });

     await send_SMS(sns,params);

  } catch (err) {
    console.error('SMS gönderilemedi:', err);
    throw err;
  } 



};



// SMS gönderim testi
sendSMS('+905321565286', 'Merhaba! İş ortaklığı başvurunuz başarıyla onaylandı.')
  .then(() => console.log('SMS başarıyla gönderildi!'))
  .catch((err) => console.error('Hata:', err));

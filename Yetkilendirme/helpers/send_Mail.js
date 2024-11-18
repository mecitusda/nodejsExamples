const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.MAILER_CLIENT_ID,
  process.env.MAILER_CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refresh_token:process.env.MAILER_REFRESH_TOKEN
});


const sendMail =async(to,message,name,...args) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service:process.env.MAILER_SERVICE,
    auth:{
      type: 'OAuth2',
      user:process.env.MAILER_MAIL,
      clientId:process.env.MAILER_CLIENT_ID,
      clientSecret:process.env.MAILER_CLIENT_SECRET,
      refreshToken:process.env.MAILER_REFRESH_TOKEN,
      accessToken:accessToken
    }
  });//Bu kısımda mailer servisine ait bilgileri yazıyoruz.
  const html = get_html(message,name,...args);
  const mailerOptions = {
    from:`BuSiparis <${process.env.MAILER_MAIL}>`,
    to:to,
    subject:html.subject,
    text:message,
    html:html.body(name,...args)
  };
  
  transporter.sendMail(mailerOptions,(err,info) => {
    if(err){
      console.log(err);
    }
    transporter.close();
  });
}

function get_html(message,name,...args){//Bu fonksiyon mailin içeriğini düzenler.
  return message(name,...args);
}



//Alt kısımda hazırlanmış metin içerikleri bulunmaktadır.

const partnerbasvuru = (name) => {
  return  {
    subject: 'İş Ortaklığı Başvurusu Alındı',
  body: (username=name) => {
    console.log(`${username} isimli kişinin başvurusu alındı.`);
    return `Merhaba <strong>${username}</strong>,<br><br>
    İş ortaklığı başvurunuz başarıyla <strong>alındı</strong>!<br>
    Başvurunuz ekibimiz tarafından değerlendirilip sonuçlandırılacaktır. Başvurunuz onaylandığında tarafınıza bir bilgilendirme maili gönderilecektir.<br><br>
    Süreçle ilgili herhangi bir sorunuz olursa, bizimle iletişime geçmekten çekinmeyin.<br><br>
    İyi günler dileriz!<br>
    <strong>BuSiparis Ekibi</strong>..`;
  }
  }
};

  const partnerbasvuru_onay = (name,password) =>  {
    return {
      subject: 'İş Ortaklığı Başvurusu Bilgilendirme',
    body: (username=name, userpassword=password) => {
      console.log(`${username} isimli kişinin başvurusu onaylandı!`);
     return  `Merhaba <strong>${username}</strong>,<br><br>
    İş ortaklığı başvurunuz <strong><u>onaylandı!</u></strong><br>
    Sizi aramızda görmenin mutluluğunu içerisindeyiz! İş ortağı olarak kayıt işlemlerinizi başarıyla tamamladık. 
    Altta yazan tek kullanımlık şifrenizi kullanarak sisteme giriş yapabilir ve yeni şifre oluşturabilirsiniz.<br><br>
    <strong>Şifreniz:</strong> <strong><u>${userpassword}</u></strong><br><br>
    Yardımcı olmamız gereken bir konu olursa, lütfen bizimle iletişime geçmekten çekinmeyin.<br><br>
    İyi günler dileriz!<br>
    <strong>BuSiparis Ekibi</strong>.`;
      
    }
    }
  };

module.exports = {sendMail,partnerbasvuru,partnerbasvuru_onay};
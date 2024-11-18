const router = require('express').Router();
const controller = require('../controllers/auth');
const facebook = require('../middlewares/facebook-veriy');


router.get('/login/facebook',controller.post_login_facebook);
router.post('/login',controller.post_login_without_media);


router.post('/register/company',controller.post_register_company);//burada şirket üyelik isteği yolliycak eğer kabul edilirse
//başvuran kişiye ilk admin üyeliği yapılıp e posta veya sms ile yollanacak.

router.post('/register/employee',controller.post_register_employee);//Burada ise çalışan üyelik isteği yollanacak eğer kabul edilirse şirketteki gibi default bir üyelik atanacak.(email e karşılık şifre verilecek.)

router.get('/verify',controller.get_verify);//burada çalışanın telefonuna doğrulama kodu yollanacak.
router.post('/verify',controller.post_verify);//burada çalışanın telefonun doğrulama kodu kontrol edilecek.



























//güvenlik için crf tokenı unutma.

module.exports = router;
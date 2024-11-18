const router = require('express').Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/auth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/register/partner',controller.post_register_partner);//burada partner üyelik isteği yollanacak eğer kabul edilirse şirketteki gibi default bir üyelik atanacak.(email e karşılık şifre verilecek.)

router.post('/verify/partner/:id',controller.post_verify_register_partner);//burada partnerın üyelik isteği kabul edilecek ve şifre verilecek.

router.get('/register', controller.get_register);//burada register sayfasına gidicek.

router.post('/register', controller.post_register);


router.get('/login', controller.get_login);


router.post('/login', controller.post_login);


router.get('/logout', controller.get_logout);


module.exports = router;
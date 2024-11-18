const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');//giriş kontrolü yapmadan admin kontrolü yapma.
const isauth = require('../middlewares/auth');
const controller = require('../controllers/admin');

router.post('/accept_employee',controller.post_accept_employee);//kabul edilirse çalışanın üyeliği aktif edilecek.

router.get('/employees',[isauth,isAdmin],controller.get_employees);//şirketteki çalışanlar listelenecek.

router.post('/create_service',[isauth,isAdmin],controller.post_create_service);//şirketin hizmeti oluşturulacak.

module.exports = router;
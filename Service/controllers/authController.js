const axios = require('axios');
const extraheader = require('../helpers/updateheaders');
module.exports.auth =  async (req, res) => {
    
    try {// url:`https://busiparis-auth-manager-e2ce73ccce2c.herokuapp.com${req.url}`,
           
              const extra = extraheader(req);
              const response = await axios({
                  method: req.method,
                  url: `http://127.0.0.1:306${req.url}`,//düzeltilcek
                  data:req.body, // Mikroservise yönlendiriyoruz
                  headers: extra // Mikroservise yönlendiriyoruz
              }
            );
            res.set(response.headers);
            res.status(response.status).send(response.data);
       } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
    
  
}
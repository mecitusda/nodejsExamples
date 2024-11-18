const axios = require('axios');
const extraheader = require('../helpers/updateheaders');
module.exports.hizmet =  async (req, res) => {
    
    try {   
             
           
             // https://busiparis-service-deployment-e4917836c035.herokuapp.com${req.url}
             const extra = extraheader(req);
              const response = await axios({
                  method: req.method,
                  url: `http://127.0.0.1:304${req.url}`,
                  data:req.body // Mikroservise yönlendiriyoruz
              }
            );
            res.set(response.headers);
            res.status(response.status).send(response.data);
       } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }
    
    
}
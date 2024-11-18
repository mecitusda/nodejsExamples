const axios = require('axios');
const extraheader = require('../helpers/updateheaders');
module.exports.kargo =  async (req, res) => {
    
    try {
              console.log(req.method)
             // `https://busiparis-cargo-deployment-c1ee2c24d970.herokuapp.com${req.url}`
             const extra = extraheader(req);
              const response = await axios({
                  method: req.method,
                  url:`http://127.0.0.1:300${req.url}`,
                  data:req.body // Mikroservise yönlendiriyoruz
              }
            );
            res.set(response.headers);
            res.status(response.status).send(response.data);
       } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data);
    }

    
}
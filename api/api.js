const LottoController = require('../Controller/LottoController');

const api = (app) => {
    app.get('/test',async  (req,res) =>  {
        await LottoController.scrape()
        res.send().status(200);
    })
};

module.exports = api;
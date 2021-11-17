const LottoController = require('../Controller/LottoController');

const api = (app) => {
    app.get('/test', async (req,res) =>  {
        res.send(await LottoController.scrape());
        // res.sendStatus(200);
    })
};

module.exports = api;
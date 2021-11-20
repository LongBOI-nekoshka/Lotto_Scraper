const LottoController = require('../Controller/LottoController');

const api = (app) => {
    app.get('/test/:gameMode?', async (req,res) =>  {
        res.send(await LottoController.scrape(req.params.gameMode ?? 0));
        // res.sendStatus(200);
    })
};

module.exports = api;